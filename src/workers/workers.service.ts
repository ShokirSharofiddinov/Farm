import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Worker, WorkerDocument } from './schemas/worker.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const createdWorker = await new this.workerModel(createWorkerDto).save();
    
    console.log(createWorkerDto)



    const updatedAdmin = await this.workerModel.findByIdAndUpdate(
      createdWorker._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const workers = this.workerModel.find();
    return workers;
  }

  findOne(id: string) {
    const worker = this.workerModel.findById(id);
    console.log(worker);
    return worker;
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    const updateWorker = await this.workerModel.findByIdAndUpdate(
      id,
      updateWorkerDto,
      { new: true },
    );

    if (updateWorker === null || updateWorker === undefined) {
      throw new NotFoundException(`Worker #${id} not found`);
    }

    return updateWorker;
  }

  async remove(id: string) {
    return this.workerModel.findByIdAndDelete(id);
  }
}
