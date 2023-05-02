import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoorWeightDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
