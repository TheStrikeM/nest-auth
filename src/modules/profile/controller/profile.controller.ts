import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtGuard from '../../auth/guard/jwt.guard';


@Controller('profile')
export default class ProfileController {

  constructor() {}

  @UseGuards(JwtGuard)
  @Get()
  getProfile() {
    return {message: "Your profile"}
  }
}