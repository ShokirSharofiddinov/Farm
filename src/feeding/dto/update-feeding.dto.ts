import { PartialType } from '@nestjs/swagger';
import { CreateFeedingDto } from './create-feeding.dto';

export class UpdateFeedingDto extends PartialType(CreateFeedingDto) {
  animal_id?: string;
  feeding_schedules?: string[];
  types_of_feed?: string[];
  dietary?: string;
  worker_id?: string;
}
