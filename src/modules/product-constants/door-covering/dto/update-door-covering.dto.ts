import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDoorCoveringDto {
  @IsNotEmpty()
  @IsString()
  name: string;


}
