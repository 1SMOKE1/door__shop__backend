import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

export class CreateFabricMaterialWidthDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
