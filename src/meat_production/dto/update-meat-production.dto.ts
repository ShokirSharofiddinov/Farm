import { PartialType } from '@nestjs/swagger';
import { CreateMeatProductionDto } from './create-meat-production.dto';

export class UpdateMeatProductionDto extends PartialType(
  CreateMeatProductionDto,
) {
  meat_yield?: number;
  slaughter_date?: string;
  shearing_schedule?: string;
  animal_id? : number;
}
