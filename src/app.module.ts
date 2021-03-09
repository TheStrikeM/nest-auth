import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserModule from './modules/user/user.module';


const dbConnectURI =
  'mongodb+srv://admin:admin@cluster0.yj5xp.mongodb.net/nextjs-learn?retryWrites=true&w=majority'

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(dbConnectURI)
  ],
})
export class AppModule {}
