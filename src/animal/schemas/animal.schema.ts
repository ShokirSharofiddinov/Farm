import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AnimalDocument = HydratedDocument<Animal>;

@Schema()
export class Animal {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'animaltypes'})
  animal_type_id: number;

  @Prop({ required: true })
  photos: string;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
