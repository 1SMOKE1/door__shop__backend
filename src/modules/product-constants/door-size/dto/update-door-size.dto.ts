import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDoorSizeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
