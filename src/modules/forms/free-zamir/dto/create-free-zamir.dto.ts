import { IsMobilePhone, IsNotEmpty, IsString, MinLength, } from "class-validator";


export class CreateFreeZamirDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('uk-UA')
  @MinLength(10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  address: string;
  
}
