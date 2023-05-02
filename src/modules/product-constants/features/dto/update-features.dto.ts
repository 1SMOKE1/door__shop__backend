import { IsNotEmpty, IsString } from "class-validator";

export class UpdateFeaturesDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
