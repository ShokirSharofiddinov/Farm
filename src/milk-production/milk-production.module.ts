import { Module } from '@nestjs/common';
import { MilkProductionService } from './milk-production.service';
import { MilkProductionController } from './milk-production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MilkProduction, MilkProductionSchema } from './schemas/milk-production.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MilkProduction.name, schema: MilkProductionSchema}]),
    JwtModule.register({}),
  ],
  controllers: [MilkProductionController],
  providers: [MilkProductionService],
})
export class MilkProductionModule {}
