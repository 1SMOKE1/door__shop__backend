import { IsNotEmpty, IsString, IsOptional, IsNumber, IsPositive } from "class-validator";

export class UpdateFabricMaterialWidthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
