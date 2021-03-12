import { Injectable } from '@nestjs/common';


@Injectable()
export default class FileService {

  constructor() {}

  getSex(): any {
    return {message: "Привет!"}
  }
}