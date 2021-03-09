import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';


const dbConnectURI =
  'mongodb+srv://admin:admin@cluster0.yj5xp.mongodb.net/nextjs-learn?retryWrites=true&w=majority'

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(dbConnectURI),
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
