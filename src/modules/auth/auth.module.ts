import { Module } from '@nestjs/common';
import UserModule from '../user/user.module';
import AuthService from './services/auth.service';
import LocalStrategy from './services/local.strategy';
import AuthController from './controller/auth.controller';


@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export default class AuthModule {}