import { Injectable } from '@nestjs/common';
import * as path from 'path'
import fs from 'fs'
import * as uuid from 'uuid'


@Injectable()
export default class FileService {

  createFile(file): string {
    const fileExtension = file.originalname.split('.').pop()
    const fileName = `${uuid.v4()}.${fileExtension}`
    const filePath = path.resolve(__dirname, '..', '..', 'static', 'photo')

    if(!fs.existsSync(filePath)) {
      fs.mkdirSync(path.resolve(filePath, fileName), file.buffer)
    }
    return fileName
   }
}