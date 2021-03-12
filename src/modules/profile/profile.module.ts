import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import UserModule from '../user/user.module';
import ProfileService from './services/profile.service';
import ProfileController from './controller/profile.controller';


@Module({
  imports: [AuthModule, UserModule],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export default class ProfileModule {}