import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import JwtStrategy from './services/jwt.strategy';
import CryptoService from './services/crypto.service';
import { RolesGuard } from './guard/roles.guard';
import JwtGuard from './guard/jwt.guard';
import UserModule from '../user/user.module';
import AuthService from './services/auth.service';
import LocalStrategy from './services/local.strategy';
import AuthController from './controller/auth.controller';


@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CryptoService,
    RolesGuard,
    JwtGuard
  ]
})
export default class AuthModule {}