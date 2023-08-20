import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RecordOfIllnessDocument = RecordOfIllness & mongoose.Document;

@Schema()
export class RecordOfIllness {
  @Prop({ required: true })
  illness_type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true })
  animal_id: number

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  disease: string;

  @Prop()
  medicines: string;

  @Prop({ required: true })
  date_treatment: Date;

  @Prop()
  illness_photo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true })
  worker_id: number

}

export const RecordOfIllnessSchema = SchemaFactory.createForClass(RecordOfIllness);
