import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class FiberProduction {
  @Prop({ required: true })
  fiber_yield: number;

  @Prop({ required: true })
  shearing_schedule: string;

  @Prop({ required: true })
  fiber_quality: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true })
  animal_id: number;
}

export const FiberProductionSchema =
  SchemaFactory.createForClass(FiberProduction);
