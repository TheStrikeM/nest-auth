import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'
import { ConfigService } from '@nestjs/config';


@Injectable()
export default class CryptoService {
  constructor(
    private readonly configService: ConfigService
  ) {
  }

  encrypt(pass: string): string {
    try {
      const cipher = crypto.createCipher(
        this.configService.get<string>('CRYPT_ALGORITHM'),
        this.configService.get<string>('CRYPT_SECRET_KEY')
      )
      let encrypted = cipher.update(pass,'utf8','hex')
      encrypted += cipher.final('hex');
      console.log(encrypted);
      return encrypted
    } catch (e) {
        console.log('Error in encrypting:', e)
    }
  }

  decrypt(pass: string): string {
    try {
      const decipher = crypto.createDecipher(
        this.configService.get<string>('CRYPT_ALGORITHM'),
        this.configService.get<string>('CRYPT_SECRET_KEY')
      )
      let decrypted = decipher.update(pass,'hex','utf8')
      decrypted += decipher.final('utf8');
      console.log(decrypted);
      return decrypted
    } catch (e) {
        console.log('Error in decrypting:', e)
    }
  }

}