import { IsNotEmpty, IsString } from "class-validator";

export class UpdateSealerCircuitDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
