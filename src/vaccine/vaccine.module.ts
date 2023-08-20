import { Module } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { VaccineController } from './vaccine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Vaccine, VaccineSchema } from './schemas/vaccine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vaccine.name, schema: VaccineSchema}]),
    JwtModule.register({}),
  ],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccineModule {}
