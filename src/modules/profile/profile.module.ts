import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import UserModule from '../user/user.module';
import ProfileService from './services/profile.service';
import ProfileController from './controller/profile.controller';
import FileModule from '../file/file.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    FileModule
  ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export default class ProfileModule {}