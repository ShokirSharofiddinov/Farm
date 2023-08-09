import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      return new BadRequestException('passwords is not match');
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const createdAdmin = await new this.adminModel({
      ...createAdminDto,
      hashed_password,
    }).save();

    const tokens = await this.generateToken(createdAdmin);
    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      createdAdmin._id,
      { hashed_token },
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  async generateToken(admin: AdminDocument) {
    const jwtPayload = {
      id: admin._id,
      is_creator: admin.is_creator,
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

  findAll() {
    const admins = this.adminModel.find();
    return admins;
  }

  findOne(id: string) {
    const admin = this.adminModel.findById(id);
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      id,
      updateAdminDto,
      { new: true }
    );
  
    if (updateAdmin === null || updateAdmin === undefined) {
      throw new NotFoundException(`Admin #${id} not found`);
    }
  
    return updateAdmin;
  }
  

  async remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
