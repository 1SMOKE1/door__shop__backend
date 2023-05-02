import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

export class CreateWindowHandDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
