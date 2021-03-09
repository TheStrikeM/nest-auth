import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthService from '../services/auth.service';


@Controller('auth')
export default class AuthController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return { message: "У вас есть права юзера!" }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  async refresh(@Request() req) {
    return { message: "У вас есть права юзера!" }
  }
}