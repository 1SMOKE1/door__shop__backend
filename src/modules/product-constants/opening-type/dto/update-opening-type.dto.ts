import { IsOptional, IsNotEmpty, IsString } from "class-validator";

export class UpdateOpeningTypeDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

}
