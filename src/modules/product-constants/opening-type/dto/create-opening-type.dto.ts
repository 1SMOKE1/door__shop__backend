import { IsNotEmpty, IsString } from "class-validator";

export class CreateOpeningTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;


}
