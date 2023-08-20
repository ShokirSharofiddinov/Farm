import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFiberProductionDto } from './dto/create-fiber-production.dto'
import { UpdateFiberProductionDto } from './dto/update-fiber-production.dto'
import { InjectModel } from '@nestjs/mongoose';
import { FiberProduction } from './schemas/fiber-production.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FiberProductionService {
  constructor(
    @InjectModel(FiberProduction.name) private FiberProductionModel: Model<FiberProduction>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createFiberProductionDto: CreateFiberProductionDto) {
    const createdFiberProduction = await new this.FiberProductionModel(createFiberProductionDto).save();
    
    console.log(createFiberProductionDto)

    const updatedAdmin = await this.FiberProductionModel.findByIdAndUpdate(
      createdFiberProduction._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const FiberProductions = this.FiberProductionModel.find();
    return FiberProductions;
  }

  findOne(id: string) {
    const FiberProduction = this.FiberProductionModel.findById(id);
    console.log(FiberProduction);
    return FiberProduction;
  }

  async update(id: string, updateFiberProductionDto: UpdateFiberProductionDto) {
    const updateFiberProduction = await this.FiberProductionModel.findByIdAndUpdate(
      id,
      updateFiberProductionDto,
      { new: true },
    );

    if (updateFiberProduction === null || updateFiberProduction === undefined) {
      throw new NotFoundException(`FiberProduction #${id} not found`);
    }

    return updateFiberProduction;
  }

  async remove(id: string) {
    return this.FiberProductionModel.findByIdAndDelete(id);
  }
}
