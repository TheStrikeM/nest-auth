import { Injectable } from '@nestjs/common';
import UserRepository from '../../user/services/user.repository';
import UserDto from '../../user/dto/UserDto';


@Injectable()
export default class AuthService {

  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const candidate: UserDto = await this.userRepository.findByUsername(username)
    if(candidate && candidate.password === pass) {
      const {password, ...secureUser} = candidate
      return secureUser
    }

    return null
  }
}