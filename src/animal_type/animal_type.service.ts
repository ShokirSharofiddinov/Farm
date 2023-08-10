import { Injectable } from '@nestjs/common';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';

@Injectable()
export class AnimalTypeService {
  create(createAnimalTypeDto: CreateAnimalTypeDto) {
    return 'This action adds a new animalType';
  }

  findAll() {
    return `This action returns all animalType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animalType`;
  }

  update(id: number, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    return `This action updates a #${id} animalType`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalType`;
  }
}
