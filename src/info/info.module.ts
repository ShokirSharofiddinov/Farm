import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Info, InfoSchema } from './schemas/info.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Info.name, schema: InfoSchema}]),
    JwtModule.register({}),
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
