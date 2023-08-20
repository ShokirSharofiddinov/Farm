import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Info, InfoDocument } from './schemas/info.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Info.name) private infoModel: Model<Info>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createInfoDto: CreateInfoDto) {
    const createdInfo = await new this.infoModel(createInfoDto).save();
    
    console.log(createInfoDto)

    const updatedAdmin = await this.infoModel.findByIdAndUpdate(
      createdInfo._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const infos = this.infoModel.find();
    return infos;
  }

  findOne(id: string) {
    const info = this.infoModel.findById(id);
    console.log(info);
    return info;
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    const updateInfo = await this.infoModel.findByIdAndUpdate(
      id,
      updateInfoDto,
      { new: true },
    );

    if (updateInfo === null || updateInfo === undefined) {
      throw new NotFoundException(`Info #${id} not found`);
    }

    return updateInfo;
  }

  async remove(id: string) {
    return this.infoModel.findByIdAndDelete(id);
  }
}
