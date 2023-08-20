import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecordsOfFeedingDto } from './dto/create-records-of-feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records-of-feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RecordOfFeeding } from './schemas/records-of-feeding.schema'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RecordOfService {
  constructor(
    @InjectModel(RecordOfFeeding.name) private roiModel: Model<RecordOfFeeding>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createRecordOfDto: CreateRecordsOfFeedingDto) {
    const createdRecordOf = await new this.roiModel(createRecordOfDto).save();
    
    console.log(createRecordOfDto)

    const updatedAdmin = await this.roiModel.findByIdAndUpdate(
      createdRecordOf._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const rois = this.roiModel.find();
    return rois;
  }

  findOne(id: string) {
    const roi = this.roiModel.findById(id);
    console.log(roi);
    return roi;
  }

  async update(id: string, updateRecordOfDto: UpdateRecordsOfFeedingDto) {
    const updateRecordOf = await this.roiModel.findByIdAndUpdate(
      id,
      updateRecordOfDto,
      { new: true },
    );

    if (updateRecordOf === null || updateRecordOf === undefined) {
      throw new NotFoundException(`RecordOfIFeeding #${id} not found`);
    }

    return updateRecordOf;
  }

  async remove(id: string) {
    return this.roiModel.findByIdAndDelete(id);
  }
}
