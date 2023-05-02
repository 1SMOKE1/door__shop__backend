import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoorIsolationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

}
