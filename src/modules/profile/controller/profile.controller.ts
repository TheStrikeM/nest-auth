import { Controller, Get } from '@nestjs/common';


@Controller('profile')
export default class ProfileController {

  constructor() {}

  @Get()
  getSex(): {message: string} {
    return {message: "Привет, детка!"}
  }
}