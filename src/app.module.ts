import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AnimalTypeModule } from './animal_type/animal_type.module';
import { WorkersModule } from './workers/workers.module';
import { SpecialtyModule } from './specialty/specialty.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  MongooseModule.forRoot(process.env.MONGO_URI),
  AdminModule,
  AnimalTypeModule,
  WorkersModule,
  SpecialtyModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
