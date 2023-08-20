import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordOfService } from './records-of-feeding.service';
import { CreateRecordsOfFeedingDto } from './dto/create-records-of-feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records-of-feeding.dto';

@Controller('record-of-feeding')
export class RecordOfFeedingController {
  constructor(private readonly recordOfFeedingService: RecordOfService) {}

  @Post()
  create(@Body() createRecordOfFeedingDto: CreateRecordsOfFeedingDto) {
    return this.recordOfFeedingService.create(createRecordOfFeedingDto);
  }

  @Get()
  findAll() {
    return this.recordOfFeedingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordOfFeedingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordOfFeedingDto: UpdateRecordsOfFeedingDto) {
    return this.recordOfFeedingService.update(id, updateRecordOfFeedingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordOfFeedingService.remove(id);
  }
}
