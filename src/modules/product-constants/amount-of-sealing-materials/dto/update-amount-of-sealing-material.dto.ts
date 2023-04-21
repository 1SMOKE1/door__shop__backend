import { IsNotEmpty, IsString, IsNumber, IsPositive, IsBoolean } from "class-validator";

export class UpdateAmountOfSealingMaterialDto {
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
