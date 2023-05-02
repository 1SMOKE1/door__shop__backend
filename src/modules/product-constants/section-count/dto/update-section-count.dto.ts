import { IsNotEmpty, IsString } from "class-validator";

export class UpdateSectionCountDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
