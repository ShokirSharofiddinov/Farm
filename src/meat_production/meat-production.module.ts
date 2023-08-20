import { Module } from '@nestjs/common';
import { MeatProductionService } from './meat-production.service';
import { MeatProductionController } from './meat-production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MeatProduction, MeatProductionSchema } from './schemas/meat-production.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MeatProduction.name, schema: MeatProductionSchema}]),
    JwtModule.register({}),
  ],
  controllers: [MeatProductionController],
  providers: [MeatProductionService],
})
export class MeatProductionModule {}
