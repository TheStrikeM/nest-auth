import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/User';


@Injectable()
export default class UserRepository {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username})
  }

}