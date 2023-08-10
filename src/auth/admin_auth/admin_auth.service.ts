import { MailService } from '../../mail/mail.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../../admin/schemas/admin.schema';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './dto/admin_auth_login-auth.dto';
import { Op } from 'sequelize';
import { Model } from 'mongoose';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    console.log(createAdminDto);
    const existingAdmin = await this.adminModel.findOne({
      email: createAdminDto.email,
    });

    if (existingAdmin) {
      throw new BadRequestException('Admin already exists!');
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Password confirmation does not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    console.log(hashed_password);

    const newAdmin = new this.adminModel({
      ...createAdminDto,
      hashed_password: hashed_password,
    });

    await newAdmin.save();

    const tokens = await this.getTokens(newAdmin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    console.log(uniqueKey);

    let updateAdmin = await newAdmin.updateOne(
      {
        hashed_refresh_token: hashed_refresh_token,
        active_link: uniqueKey,
      },
      { where: { email: newAdmin.email } },
    );

    updateAdmin = await this.adminModel.findOne({
      email: createAdminDto.email,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    await this.mailService.sendAdminConfirmation(updateAdmin);

    const response = {
      message: 'Admin registered',
      admin: updateAdmin,
      tokens,
    };
    return response;
  }

  async getTokens(admin: AdminDocument) {
    const jwtPayload = {
      email: admin.email,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginAdminDto: LoginDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminModel.findOne({ email });

    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);

    if (!isMatchPass) {
      throw new UnauthorizedException('Incorrect password');
    }

    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10); // Use a secure number of rounds

    await this.adminModel.updateOne(
      { _id: admin._id },
      { hashed_refresh_token },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      admin,
      tokens,
    };

    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException('Admin not found')
    }
    console.log(adminData);

    let updateAdmin = await this.adminModel.updateOne(
      { hashed_refresh_token: null, is_active: false },
      { where: { email: adminData.email } },
    );

    const admin = await this.adminModel.find({ email: adminData.email });

    console.log(admin);

    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      admin: admin[0],
    };

    return response;
  }

  async refreshToken(admin_email: string, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_email !== decodedToken['email']) {
      throw new BadRequestException('admin not found1');
    }

    const admin = await this.adminModel.findOne({ email: admin_email });
    if (!admin || !admin.hashed_password) {
      throw new BadRequestException('admin not found2');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_password,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      admin_email,
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { new: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
    });

    const response = {
      message: 'Admin refreshed',
      admin: updateAdmin,
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const updatedAdmin = await this.adminModel.findOneAndUpdate(
      { active_link: link, is_active: false },
      { $set: { is_active: true } },
      { new: true },
    );

    if (!updatedAdmin) {
      throw new BadRequestException(
        'Admin already activated or activation link is invalid',
      );
    }

    const response = {
      message: 'Admin activated successfully',
      admin: updatedAdmin,
    };

    return response;
  }
}
