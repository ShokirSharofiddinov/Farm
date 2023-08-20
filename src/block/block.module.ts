import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './schemas/block.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema}]),
    JwtModule.register({}),
  ],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
