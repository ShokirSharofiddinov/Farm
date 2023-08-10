import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Specialty, SpecialtyDocument } from './schemas/specialty.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectModel(Specialty.name) private specialtyModel: Model<Specialty>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    const createdSpecialty = await new this.specialtyModel(createSpecialtyDto).save();

    const updatedAdmin = await this.specialtyModel.findByIdAndUpdate(
      createdSpecialty._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const specialtys = this.specialtyModel.find();
    return specialtys;
  }

  findOne(id: string) {
    const specialty = this.specialtyModel.findById(id);
    console.log(specialty);
    return specialty;
  }

  async update(id: string, updateSpecialtyDto: UpdateSpecialtyDto) {
    const updateSpecialty = await this.specialtyModel.findByIdAndUpdate(
      id,
      updateSpecialtyDto,
      { new: true },
    );

    if (updateSpecialty === null || updateSpecialty === undefined) {
      throw new NotFoundException(`Specialty #${id} not found`);
    }

    return updateSpecialty;
  }

  async remove(id: string) {
    return this.specialtyModel.findByIdAndDelete(id);
  }
}
