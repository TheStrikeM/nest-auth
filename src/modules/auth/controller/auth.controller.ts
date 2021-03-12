import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthService from '../services/auth.service';
import UserRepository from '../../user/services/user.repository';
import CreateUserDto from '../dto/CreateUserDto';
import { hasRoles } from '../decorator/roles.decorator';
import JwtGuard from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';
import { UserRole } from '../../user/dto/UserDto';
import LocalGuard from '../guard/local.guard';

@Controller('auth')
export default class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository
  ) {}


  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user)
  }

  @Post('reg')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto)
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { message: "У вас есть права юзера!" }
  }

  @UseGuards(JwtGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    const user = await this.userRepository.findById(req.user.id)
    return this.authService.generateToken(user)
  }
}