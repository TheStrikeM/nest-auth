import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import UserRepository from '../../user/services/user.repository';
import { User } from '../../user/schema/User';
import FileService from '../../file/file.service';


@Injectable()
export default class ProfileService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly fileService: FileService
  ) {}

  async getProfile(id: ObjectId): Promise<User> {
    return this.userRepository.findById(id)
  }

  async setPhoto(id: ObjectId, file): Promise<User> {
    try {
        const newPhoto = this.fileService.createFile(file)
        return this.userRepository.updatePhoto(id, newPhoto)
    } catch (e) {
        throw new Error(`Error: ${e.message}`)
    }
  }
}