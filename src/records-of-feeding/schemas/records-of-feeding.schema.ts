import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class RecordOfFeeding {
  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Number, required: true })
  consumption: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Feeding', required: true })
  feeding_id: string;
}

export type RecordOfFeedingDocument = RecordOfFeeding & Document;

export const RecordOfFeedingSchema = SchemaFactory.createForClass(RecordOfFeeding);
