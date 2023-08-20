import { PartialType } from '@nestjs/swagger';
import { CreateRecordsOfFeedingDto } from './create-records-of-feeding.dto';

export class UpdateRecordsOfFeedingDto extends PartialType(
  CreateRecordsOfFeedingDto,
) {
  date?: Date;
  consumption?: number;
  feeding_id?: string;
}
