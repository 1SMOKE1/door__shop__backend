import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoorSizeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
