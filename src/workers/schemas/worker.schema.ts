import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WorkerDocument = HydratedDocument<Worker>;

@Schema()
export class Worker {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  experience: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Specialty'})
  speciality_id: number;

  @Prop()
  phone_number: string;

  @Prop()
  username: string;

  @Prop()
  worker_schedule: Date;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
