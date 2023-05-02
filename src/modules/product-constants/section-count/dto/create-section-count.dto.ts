import { IsNotEmpty, IsString } from "class-validator";

export class CreateSectionCountDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
