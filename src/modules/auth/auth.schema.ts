import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthSchema {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
