import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk-production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk-production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MilkProduction, MilkProductionDocument } from './schemas/milk-production.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MilkProductionService {
  constructor(
    @InjectModel(MilkProduction.name) private milkProductionModel: Model<MilkProduction>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createMilkProductionDto: CreateMilkProductionDto) {
    const createdMilkProduction = await new this.milkProductionModel(createMilkProductionDto).save();
    
    console.log(createMilkProductionDto)

    const updatedAdmin = await this.milkProductionModel.findByIdAndUpdate(
      createdMilkProduction._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const milkProductions = this.milkProductionModel.find();
    return milkProductions;
  }

  findOne(id: string) {
    const milkProduction = this.milkProductionModel.findById(id);
    console.log(milkProduction);
    return milkProduction;
  }

  async update(id: string, updateMilkProductionDto: UpdateMilkProductionDto) {
    const updateMilkProduction = await this.milkProductionModel.findByIdAndUpdate(
      id,
      updateMilkProductionDto,
      { new: true },
    );

    if (updateMilkProduction === null || updateMilkProduction === undefined) {
      throw new NotFoundException(`MilkProduction #${id} not found`);
    }

    return updateMilkProduction;
  }

  async remove(id: string) {
    return this.milkProductionModel.findByIdAndDelete(id);
  }
}
