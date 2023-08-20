import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block, BlockDocument } from './schemas/block.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private blockModel: Model<Block>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createBlockDto: CreateBlockDto) {
    const createdBlock = await new this.blockModel(createBlockDto).save();
    
    console.log(createBlockDto)

    const updatedAdmin = await this.blockModel.findByIdAndUpdate(
      createdBlock._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const blocks = this.blockModel.find();
    return blocks;
  }

  findOne(id: string) {
    const block = this.blockModel.findById(id);
    console.log(block);
    return block;
  }

  async update(id: string, updateBlockDto: UpdateBlockDto) {
    const updateBlock = await this.blockModel.findByIdAndUpdate(
      id,
      updateBlockDto,
      { new: true },
    );

    if (updateBlock === null || updateBlock === undefined) {
      throw new NotFoundException(`Block #${id} not found`);
    }

    return updateBlock;
  }

  async remove(id: string) {
    return this.blockModel.findByIdAndDelete(id);
  }
}
