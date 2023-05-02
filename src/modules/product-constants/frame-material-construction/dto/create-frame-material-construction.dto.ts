import { IsNotEmpty, IsString } from "class-validator";

export class CreateFrameMaterialConstructionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
