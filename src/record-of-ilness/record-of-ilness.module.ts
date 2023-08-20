import { Module } from '@nestjs/common';
import { RecordOfService } from './record-of-ilness.service';
import { RecordOfIlnessController } from './record-of-ilness.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordOfIllness, RecordOfIllnessSchema } from './schemas/record-of-ilness.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RecordOfIllness.name, schema: RecordOfIllnessSchema}]),
    JwtModule.register({}),
  ],
  controllers: [RecordOfIlnessController],
  providers: [RecordOfService],
})
export class RecordOfIlnessModule {}
