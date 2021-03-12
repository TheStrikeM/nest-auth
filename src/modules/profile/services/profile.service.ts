import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import UserRepository from '../../user/services/user.repository';
import { User } from '../../user/schema/User';


@Injectable()
export default class ProfileService {

  constructor(private readonly userRepository: UserRepository) {}

  async getProfile(id: ObjectId): Promise<User> {
    return this.userRepository.findById(id)
  }
}