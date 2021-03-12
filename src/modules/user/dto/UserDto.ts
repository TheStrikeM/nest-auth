import { ObjectId } from 'mongoose';


export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  MANAGER = "MANAGER",
  PREMIUM = "PREMIUM",
  USER = "USER"
}

export default class UserDto {
  _id?: ObjectId
  name?: string
  photo?: string
  username?: string
  password?: string
  role?: UserRole = UserRole.USER
}