import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'
import { ConfigService } from '@nestjs/config';


@Injectable()
export default class CryptoService {
  algorithm = this.configService.get<string>('CRYPT_ALGORITHM')
  secret_key = this.configService.get<string>('CRYPT_SECRET_KEY')

  constructor(
    private readonly configService: ConfigService
  ) {
  }

  encrypt(pass: string): string {
    try {
      const cipher = crypto.createCipher(
        this.algorithm,
        this.secret_key
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
        this.algorithm,
        this.secret_key
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