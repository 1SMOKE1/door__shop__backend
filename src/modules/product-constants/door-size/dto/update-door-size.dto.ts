import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDoorSizeDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
}
