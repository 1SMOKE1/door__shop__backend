import { IsOptional, IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

export class UpdateWindowProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;
}
