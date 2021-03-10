import { ObjectId } from 'mongoose';


export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

export default class UserDto {
  _id?: ObjectId
  username?: string
  password?: string
  role?: UserRole = UserRole.USER
}