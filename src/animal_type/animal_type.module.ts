import { Module } from '@nestjs/common';
import { AnimalTypeService } from './animal_type.service';
import { AnimalTypeController } from './animal_type.controller';

@Module({
  controllers: [AnimalTypeController],
  providers: [AnimalTypeService],
})
export class AnimalTypeModule {}
