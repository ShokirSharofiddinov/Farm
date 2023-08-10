import { PartialType } from '@nestjs/swagger';
import { CreateWorkerDto } from './create-worker.dto';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {
  name?: string;
  age?: number;
  experience?: string;
  speciality_id?: number;
  phone_number?: string;
  username?: string;
  worker_schedule?: Date;
}
