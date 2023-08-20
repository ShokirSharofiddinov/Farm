import { Module } from '@nestjs/common';
import { FiberProductionService } from './fiber-production.service';
import { FiberProductionController } from './fiber-production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { FiberProduction, FiberProductionSchema } from './schemas/fiber-production.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FiberProduction.name, schema: FiberProductionSchema}]),
    JwtModule.register({}),
  ],
  controllers: [FiberProductionController],
  providers: [FiberProductionService],
})
export class FiberProductionModule {}
