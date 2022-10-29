import { IsNotEmpty, IsEmail } from "class-validator";

export class AuthDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
