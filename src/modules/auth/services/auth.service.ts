import { Injectable } from '@nestjs/common';
import UserRepository from '../../user/services/user.repository';
import { User } from '../../user/schema/User';
import UserDto from '../../user/dto/UserDto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export default class AuthService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const candidate: User = await this.userRepository.findByUsername(username)
    if(candidate && candidate.password === pass) {
      const {password, ...secureUser} = candidate
      return secureUser
    }

    return null
  }

  async generateToken(user: UserDto) {
    const payload = { id: user._id, username: user.username }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }

  async registerUser(dto: UserDto) {
    const candidate = await this.userRepository.findByUsername(dto.username)
    if(candidate) {
      throw new Error("Такой пользователь уже существует")
    }

    return await this.userRepository.create(dto)
  }
}