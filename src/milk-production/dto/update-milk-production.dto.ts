import { PartialType } from '@nestjs/swagger';
import { CreateMilkProductionDto } from './create-milk-production.dto';

export class UpdateMilkProductionDto extends PartialType(
  CreateMilkProductionDto,
) {
  illness_type?: string;
  animal_id?: number;
  date?: Date;
  disease?: string;
  medicines?: string;
  date_treatment?: Date;
  illness_photo?: string;
  worker_id?: number;
}
