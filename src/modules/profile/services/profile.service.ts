import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';


@Injectable()
export default class ProfileService {

  constructor() {}

  async getProfile(id: ObjectId): Promise<any> {
    return {message: "Привет!"}
  }
}