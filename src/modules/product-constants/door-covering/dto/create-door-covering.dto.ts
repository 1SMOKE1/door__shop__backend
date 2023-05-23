import { IsNotEmpty, IsString, } from "class-validator";

export class CreateDoorCoveringDto {
  @IsNotEmpty()
  @IsString()
  name: string;


}
