import { IsNotEmpty, IsString,  } from "class-validator";

export class UpdateDoorIsolationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
