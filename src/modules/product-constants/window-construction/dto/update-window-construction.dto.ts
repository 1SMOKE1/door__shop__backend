import { IsOptional, IsNotEmpty, IsString, IsNumber, IsPositive, IsBoolean } from "class-validator";

export class UpdateWindowConstructionDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsBoolean()
  isUsing: boolean;
}
