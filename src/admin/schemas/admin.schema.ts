import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  tg_link: string;

  @Prop({ required: true })
  hashed_password: string;

  @Prop()
  hashed_token: string;

  @Prop()
  is_active: string;

  @Prop()
  is_creator: boolean;

  @Prop()
  description: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
