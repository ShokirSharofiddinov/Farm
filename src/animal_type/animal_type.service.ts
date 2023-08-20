import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalType } from './schemas/animal_type.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AnimalTypeService {
  constructor(
    @InjectModel(AnimalType.name) private animalTypeModel: Model<AnimalType>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAnimalTypeDto: CreateAnimalTypeDto) {
    const createdAnimalType = await new this.animalTypeModel(createAnimalTypeDto).save();

    const updatedAdmin = await this.animalTypeModel.findByIdAndUpdate(
      createdAnimalType._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const animalTypes = this.animalTypeModel.find();
    return animalTypes;
  }

  findOne(id: string) {
    const animalType = this.animalTypeModel.findById(id);
    console.log(animalType);
    return animalType;
  }

  async update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    const updateAnimalType = await this.animalTypeModel.findByIdAndUpdate(
      id,
      updateAnimalTypeDto,
      { new: true },
    );

    if (updateAnimalType === null || updateAnimalType === undefined) {
      throw new NotFoundException(`AnimalType #${id} not found`);
    }

    return updateAnimalType;
  }

  async remove(id: string) {
    return this.animalTypeModel.findByIdAndDelete(id);
  }
}
