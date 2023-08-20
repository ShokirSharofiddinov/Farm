import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecordOfIlnessDto } from './dto/create-record-of-ilness.dto';
import { UpdateRecordOfIlnessDto } from './dto/update-record-of-ilness.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RecordOfIllnessSchema, RecordOfIllness } from './schemas/record-of-ilness.schema'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RecordOfService {
  constructor(
    @InjectModel(RecordOfIllness.name) private roiModel: Model<RecordOfIllness>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createRecordOfDto: CreateRecordOfIlnessDto) {
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

  async update(id: string, updateRecordOfDto: UpdateRecordOfIlnessDto) {
    const updateRecordOf = await this.roiModel.findByIdAndUpdate(
      id,
      updateRecordOfDto,
      { new: true },
    );

    if (updateRecordOf === null || updateRecordOf === undefined) {
      throw new NotFoundException(`RecordOfIllness #${id} not found`);
    }

    return updateRecordOf;
  }

  async remove(id: string) {
    return this.roiModel.findByIdAndDelete(id);
  }
}
