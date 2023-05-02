import { IsNotEmpty, IsString } from "class-validator";

export class CreateFeaturesDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
