import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class MeatProduction {
  @Prop({ required: true })
  meat_yield: number;

  @Prop({ required: true })
  slaughter_date: string;

  @Prop({ required: true })
  shearing_schedule: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true })
  animal_id: number;
}

export const MeatProductionSchema =
  SchemaFactory.createForClass(MeatProduction);
