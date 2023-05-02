import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDoorInsulationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
