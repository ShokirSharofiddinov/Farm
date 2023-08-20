import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Info {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true })
  weight: number;

  @Prop({ required: true })
  color: string;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birth_or_acquisition: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'block', required: true })
  block_id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'animal', required: true })
  animal_id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'animal' })
  parent_id: string;
}

export type InfoDocument = Info & Document;

export const InfoSchema = SchemaFactory.createForClass(Info);
