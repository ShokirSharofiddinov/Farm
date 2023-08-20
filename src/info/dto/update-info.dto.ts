import { PartialType } from '@nestjs/swagger';
import { CreateInfoDto } from './create-info.dto';

export class UpdateInfoDto extends PartialType(CreateInfoDto) {
  name?: string;
  weight?: number;
  color?: string;
  height?: number;
  breed?: string;
  gender?: string;
  birth_or_acquisition?: string;
  block_id?: string;
  animal_id?: string;
  parent_id?: string;
}
