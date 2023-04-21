import { IsNotEmpty, IsString, IsNumber, IsPositive, IsBoolean, IsOptional } from "class-validator";

export class UpdateAmountOfSealingMaterialDto {
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
