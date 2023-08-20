import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Feeding {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'animal', required: true })
  animal_id: string;

  @Prop({ type: [String], required: true })
  feeding_schedules: string[];

  @Prop({ type: [String], required: true })
  types_of_feed: string[];

  @Prop({ type: String, required: true })
  dietary: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'worker', required: true })
  worker_id: string;
}

export type FeedingDocument = Feeding & Document;

export const FeedingSchema = SchemaFactory.createForClass(Feeding);
