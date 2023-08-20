import { PartialType } from '@nestjs/swagger';
import { CreateRecordOfIlnessDto } from './create-record-of-ilness.dto';

export class UpdateRecordOfIlnessDto extends PartialType(
  CreateRecordOfIlnessDto,
) {
  illness_type?: string;
  animal_id?: number;
  date?: Date;
  disease?: string;
  medicines: string;
  date_treatment?: Date;
  illness_photo?: string;
  worker_id?: number;
}
