import { Module } from '@nestjs/common';
import UserModule from '../user/user.module';
import AuthService from './services/auth.service';
import LocalStrategy from './services/local.strategy';


@Module({
  imports: [UserModule],
  controllers: [],
  providers: [AuthService, LocalStrategy]
})
export default class AuthModule {}