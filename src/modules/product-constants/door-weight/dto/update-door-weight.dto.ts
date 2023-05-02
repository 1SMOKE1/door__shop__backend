import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDoorWeightDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
