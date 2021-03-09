import { ObjectId } from 'mongoose';

export default class UserDto {
  _id?: ObjectId
  username: string
  password?: string
}