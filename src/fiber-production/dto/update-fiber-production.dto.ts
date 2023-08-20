import { PartialType } from '@nestjs/swagger';
import { CreateFiberProductionDto } from './create-fiber-production.dto';

export class UpdateFiberProductionDto extends PartialType(
  CreateFiberProductionDto,
) {
  fiber_yield?: number;
  shearing_schedule?: string;
  fiber_quality?: string;
  animal_id?: number;
}
