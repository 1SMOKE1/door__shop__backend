import { IsNotEmpty, IsString } from "class-validator";

export class UpdateFrameMaterialConstructionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
