import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthService from '../services/auth.service';
import UserRepository from '../../user/services/user.repository';
import CreateUserDto from '../dto/CreateUserDto';

@Controller('auth')
export default class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository
  ) {}


  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user)
  }

  @Post('reg')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto)
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return { message: "У вас есть права юзера!" }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const user = await this.userRepository.findById(req.user.id)
    return this.authService.generateToken(user)
  }
}