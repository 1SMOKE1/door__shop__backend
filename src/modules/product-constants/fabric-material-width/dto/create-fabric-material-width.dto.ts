import { IsNotEmpty, IsString, IsPositive, IsNumberString } from "class-validator";
import { Type } from "class-transformer";

export class CreateFabricMaterialWidthDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsNumberString()
  @IsPositive()
  @Type(() => Number)
  price: number;
}
