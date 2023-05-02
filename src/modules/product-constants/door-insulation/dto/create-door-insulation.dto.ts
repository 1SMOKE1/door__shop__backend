import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoorInsulationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
