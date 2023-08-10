import { Module } from '@nestjs/common';
import { WorkerService } from './workers.service';
import { WorkersController } from './workers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from './schemas/worker.schema';
import { JwtModule } from '@nestjs/jwt';
import {
  Specialty,
  SpecialtySchema,
} from '../specialty/schemas/specialty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Worker.name, schema: WorkerSchema },
      // { name: Specialty.name, schema: SpecialtySchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [WorkersController],
  providers: [WorkerService],
})
export class WorkersModule {}
