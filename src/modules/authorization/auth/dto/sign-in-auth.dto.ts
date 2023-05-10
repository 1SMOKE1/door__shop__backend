import { IsEmail, IsString } from "class-validator";

export class SignInAuthDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  password: string;
}
