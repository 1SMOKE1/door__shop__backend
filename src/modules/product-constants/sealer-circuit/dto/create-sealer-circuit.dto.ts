import { IsNotEmpty, IsString } from "class-validator";

export class CreateSealerCircuitDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
