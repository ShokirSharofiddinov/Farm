import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Feeding, FeedingDocument } from './schemas/feeding.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FeedingService {
  constructor(
    @InjectModel(Feeding.name) private feedingModel: Model<Feeding>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createFeedingDto: CreateFeedingDto) {
    const createdFeeding = await new this.feedingModel(createFeedingDto).save();
    
    console.log(createFeedingDto)

    const updatedAdmin = await this.feedingModel.findByIdAndUpdate(
      createdFeeding._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const feedings = this.feedingModel.find();
    return feedings;
  }

  findOne(id: string) {
    const feeding = this.feedingModel.findById(id);
    console.log(feeding);
    return feeding;
  }

  async update(id: string, updateFeedingDto: UpdateFeedingDto) {
    const updateFeeding = await this.feedingModel.findByIdAndUpdate(
      id,
      updateFeedingDto,
      { new: true },
    );

    if (updateFeeding === null || updateFeeding === undefined) {
      throw new NotFoundException(`Feeding #${id} not found`);
    }

    return updateFeeding;
  }

  async remove(id: string) {
    return this.feedingModel.findByIdAndDelete(id);
  }
}
