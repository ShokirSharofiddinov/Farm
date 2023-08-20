import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type MilkProductionDocument = MilkProduction & mongoose.Document;

@Schema()
export class MilkProduction {
  @Prop({ required: true })
  milk_yield: number;

  @Prop({ required: true })
  milk_schedule: string;

  @Prop({ required: true })
  milk_quality: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true })
  animal_id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  production_date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true })
  worker_id: number
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal: number
}

export const MilkProductionSchema = SchemaFactory.createForClass(MilkProduction);
