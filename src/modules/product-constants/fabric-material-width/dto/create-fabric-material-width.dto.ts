import { IsNotEmpty, IsString, IsPositive, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateFabricMaterialWidthDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;
}
