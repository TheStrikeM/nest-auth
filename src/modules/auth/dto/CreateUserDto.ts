// @ts-ignore
import { MaxLength, MinLength } from 'class-validator';


export default class CreateUserDto {
  @MinLength(5, {
    message: "Ваш логин должен состоять из не менее 5 символов"
  })
  @MaxLength(25, {
    message: "Ваш логин должен состоять из не менее 25 символов"
  })
  username: string


  @MinLength(5, {
    message: "Ваш пароль должен состоять из не менее 5 символов"
  })
  @MaxLength(25, {
    message: "Ваш пароль должен состоять из не менее 25 символов"
  })
  password: string
}