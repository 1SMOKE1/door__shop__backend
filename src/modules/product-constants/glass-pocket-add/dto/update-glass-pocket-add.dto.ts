import { IsNotEmpty, IsString, IsOptional, IsNumber, IsPositive } from "class-validator";

export class UpdateGlassPocketAddDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;
}
