import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCamerasCountDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
