import { IsOptional, IsNotEmpty, IsString, IsNumber, IsPositive, IsBoolean } from "class-validator";

export class UpdateFrameMaterialDto {
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
