import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AnimalTypeModule } from './animal_type/animal_type.module';
import { WorkersModule } from './workers/workers.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { AnimalModule } from './animal/animal.module';
import { RecordOfIlnessModule } from './record-of-ilness/record-of-ilness.module';
import { MilkProductionModule } from './milk-production/milk-production.module';
import { FiberProductionModule } from './fiber-production/fiber-production.module';
import { MeatProductionModule } from './meat_production/meat-production.module';
import { FeedingModule } from './feeding/feeding.module';
import { RecordsOfFeedingModule } from './records-of-feeding/records-of-feeding.module';
import { BlockModule } from './block/block.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  MongooseModule.forRoot(process.env.MONGO_URI),
  AdminModule,
  AnimalTypeModule,
  WorkersModule,
  SpecialtyModule,
  VaccineModule,
  AnimalModule,
  RecordOfIlnessModule,
  MilkProductionModule,
  FiberProductionModule,
  MeatProductionModule,
  FeedingModule,
  RecordsOfFeedingModule,
  BlockModule,
  InfoModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
