import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Block {
  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  description: string;
}

export type BlockDocument = Block & Document;

export const BlockSchema = SchemaFactory.createForClass(Block);
