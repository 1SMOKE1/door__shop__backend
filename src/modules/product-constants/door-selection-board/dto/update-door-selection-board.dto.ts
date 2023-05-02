import { IsOptional, IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

export class UpdateDoorSelectionBoardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
