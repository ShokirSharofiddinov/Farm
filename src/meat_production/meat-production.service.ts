import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMeatProductionDto } from './dto/create-meat-production.dto'
import { UpdateMeatProductionDto } from './dto/update-meat-production.dto'
import { InjectModel } from '@nestjs/mongoose';
import { MeatProduction } from './schemas/meat-production.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MeatProductionService {
  constructor(
    @InjectModel(MeatProduction.name) private MeatProductionModel: Model<MeatProduction>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createMeatProductionDto: CreateMeatProductionDto) {
    const createdMeatProduction = await new this.MeatProductionModel(createMeatProductionDto).save();
    
    console.log(createMeatProductionDto)

    const updatedAdmin = await this.MeatProductionModel.findByIdAndUpdate(
      createdMeatProduction._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const MeatProductions = this.MeatProductionModel.find();
    return MeatProductions;
  }

  findOne(id: string) {
    const MeatProduction = this.MeatProductionModel.findById(id);
    console.log(MeatProduction);
    return MeatProduction;
  }

  async update(id: string, updateMeatProductionDto: UpdateMeatProductionDto) {
    const updateMeatProduction = await this.MeatProductionModel.findByIdAndUpdate(
      id,
      updateMeatProductionDto,
      { new: true },
    );

    if (updateMeatProduction === null || updateMeatProduction === undefined) {
      throw new NotFoundException(`MeatProduction #${id} not found`);
    }

    return updateMeatProduction;
  }

  async remove(id: string) {
    return this.MeatProductionModel.findByIdAndDelete(id);
  }
}
