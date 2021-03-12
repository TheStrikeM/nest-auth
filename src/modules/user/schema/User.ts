import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../dto/UserDto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    min: 5,
    max: 25,
  })
  name: string;

  @Prop({
    min: 5,
    max: 25,
    unique: true,
    default: "Нет"
  })
  photo: string;

  @Prop({
    min: 5,
    max: 25,
    required: true,
    unique: true
  })
  username: string;

  @Prop({
    min: 5,
    max: 25,
    required: true
  })
  password: string;

  @Prop({enum: UserRole, default: UserRole.USER})
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);