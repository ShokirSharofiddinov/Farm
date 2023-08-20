import { Module } from '@nestjs/common';
import { RecordOfService } from './records-of-feeding.service';
import { RecordOfFeedingController } from './records-of-feeding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordOfFeeding, RecordOfFeedingSchema } from './schemas/records-of-feeding.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RecordOfFeeding.name, schema: RecordOfFeedingSchema}]),
    JwtModule.register({}),
  ],
  controllers: [RecordOfFeedingController],
  providers: [RecordOfService],
})
export class RecordsOfFeedingModule {}
