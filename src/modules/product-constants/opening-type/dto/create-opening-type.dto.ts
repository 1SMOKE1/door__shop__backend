import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional, IsBoolean } from "class-validator";

export class CreateOpeningTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsBoolean()
  isUsing: boolean;
}