import { Module } from '@nestjs/common';
import { AnimalTypeService } from './animal_type.service';
import { AnimalTypeController } from './animal_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalType, AnimalTypeSchema } from './schemas/animal_type.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AnimalType.name, schema: AnimalTypeSchema}]),
    JwtModule.register({}),
  ],
  controllers: [AnimalTypeController],
  providers: [AnimalTypeService],
})
export class AnimalTypeModule {}
