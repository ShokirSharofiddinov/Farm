import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from './schemas/animal.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<Animal>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    const createdAnimal = await new this.animalModel(createAnimalDto).save();
    
    console.log(createAnimalDto)

    const updatedAdmin = await this.animalModel.findByIdAndUpdate(
      createdAnimal._id,
      { new: true },
    );
    console.log(updatedAdmin);
    return updatedAdmin;
  }

  findAll() {
    const animals = this.animalModel.find();
    return animals;
  }

  findOne(id: string) {
    const animal = this.animalModel.findById(id);
    console.log(animal);
    return animal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const updateAnimal = await this.animalModel.findByIdAndUpdate(
      id,
      updateAnimalDto,
      { new: true },
    );

    if (updateAnimal === null || updateAnimal === undefined) {
      throw new NotFoundException(`Animal #${id} not found`);
    }

    return updateAnimal;
  }

  async remove(id: string) {
    return this.animalModel.findByIdAndDelete(id);
  }
}
