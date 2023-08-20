import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordOfService } from './record-of-ilness.service';
import { CreateRecordOfIlnessDto } from './dto/create-record-of-ilness.dto';
import { UpdateRecordOfIlnessDto } from './dto/update-record-of-ilness.dto';

@Controller('record-of-ilness')
export class RecordOfIlnessController {
  constructor(private readonly recordOfIlnessService: RecordOfService) {}

  @Post()
  create(@Body() createRecordOfIlnessDto: CreateRecordOfIlnessDto) {
    return this.recordOfIlnessService.create(createRecordOfIlnessDto);
  }

  @Get()
  findAll() {
    return this.recordOfIlnessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordOfIlnessService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordOfIlnessDto: UpdateRecordOfIlnessDto) {
    return this.recordOfIlnessService.update(id, updateRecordOfIlnessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordOfIlnessService.remove(id);
  }
}
