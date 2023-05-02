import { IsNotEmpty, IsString } from "class-validator";

export class CreateCamerasCountDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
