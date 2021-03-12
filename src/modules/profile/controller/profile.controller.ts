import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import JwtGuard from '../../auth/guard/jwt.guard';
import ProfileService from '../services/profile.service';


@Controller('profile')
export default class ProfileController {

  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getProfile(@Request() req) {
    return this.profileService.getProfile(req.user._id)
  }
}