import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductProducerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

}
