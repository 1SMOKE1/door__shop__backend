import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional, IsBoolean } from "class-validator";

export class CreateFinishingTheSurfaceDto {
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