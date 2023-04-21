import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateAmountOfSealingMaterialDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  isUsing: boolean;
}
