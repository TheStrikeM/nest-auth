import { Body, Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import JwtGuard from '../../auth/guard/jwt.guard';
import ProfileService from '../services/profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import UserDto from '../../user/dto/UserDto';


@Controller('profile')
export default class ProfileController {

  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getProfile(@Request() req) {
    return this.profileService.getProfile(req.user._id)
  }

  @UseGuards(JwtGuard)
  @Post('set-photo')
  @UseInterceptors(FileInterceptor('file'))
  async setPhoto(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.profileService.setPhoto(req.user._id, file)
  }

  @UseGuards(JwtGuard)
  @Post()
  async update(@Request() req, @Body() dto: UserDto) {
    return this.profileService
  }
}