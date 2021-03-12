import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../schema/User';
import UserDto from '../dto/UserDto';


@Injectable()
export default class UserRepository {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username})
  }

  async findById(id: ObjectId): Promise<User | undefined> {
    return this.userModel.findById(id)
  }

  async create(dto: UserDto): Promise<User> {
    return this.userModel.create({...dto})
  }

  async updatePhoto(id: ObjectId, fileName: string): Promise<User> {
    const updatedUser = await this.userModel.findById(id)
    updatedUser.photo = fileName
    await updatedUser.save()

    return updatedUser
  }

}