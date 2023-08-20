import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vaccine, VaccineDocument } from './schemas/vaccine.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VaccineService {
  constructor(
    @InjectModel(Vaccine.name) private vaccineModel: Model<Vaccine>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createVaccineDto: CreateVaccineDto) {
    const createdVaccine = await new this.vaccineModel(createVaccineDto).save();

    const updatedAdmin = await this.vaccineModel.findByIdAndUpdate(
      createdVaccine._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const vaccines = this.vaccineModel.find();
    return vaccines;
  }

  findOne(id: string) {
    const vaccine = this.vaccineModel.findById(id);
    console.log(vaccine);
    return vaccine;
  }

  async update(id: string, updateVaccineDto: UpdateVaccineDto) {
    const updateVaccine = await this.vaccineModel.findByIdAndUpdate(
      id,
      updateVaccineDto,
      { new: true },
    );

    if (updateVaccine === null || updateVaccine === undefined) {
      throw new NotFoundException(`Vaccine #${id} not found`);
    }

    return updateVaccine;
  }

  async remove(id: string) {
    return this.vaccineModel.findByIdAndDelete(id);
  }
}
