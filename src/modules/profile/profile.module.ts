import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import UserModule from '../user/user.module';
import ProfileService from './services/profile.service';
import ProfileController from './controller/profile.controller';
import FileModule from '../file/file.module';
import FileService from '../file/file.service';


@Module({
  imports: [
    AuthModule,
    UserModule,
    FileModule
  ],
  providers: [ProfileService, FileService],
  controllers: [ProfileController]
})
export default class ProfileModule {}