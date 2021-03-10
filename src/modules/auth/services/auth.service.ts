import { Injectable } from '@nestjs/common';
import UserRepository from '../../user/services/user.repository';
import { User } from '../../user/schema/User';
import UserDto from '../../user/dto/UserDto';
import { JwtService } from '@nestjs/jwt';
import CryptoService from './crypto.service';


@Injectable()
export default class AuthService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const candidate: User = await this.userRepository.findByUsername(username)
    const decryptedPassword = this.cryptoService.decrypt(candidate.password)
    if(candidate && decryptedPassword === pass) {
      const {password, ...secureUser} = candidate
      return secureUser
    }

    return null
  }

  async generateToken(user) {
    const {password, ...payload} = user._doc
    return {
      message: "Вы успешно авторизовались!",
      accessToken: this.jwtService.signAsync({user: payload}),
      user: payload
    }
  }

  async registerUser(dto: UserDto) {
    const candidate = await this.userRepository.findByUsername(dto.username)
    if(candidate) {
      throw new Error("Такой пользователь уже существует")
    }

    const encryptedPassword = this.cryptoService.encrypt(dto.password)
    return await this.userRepository.create({ ...dto, password: encryptedPassword })
  }
}