import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAdminDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  password: string;

}
