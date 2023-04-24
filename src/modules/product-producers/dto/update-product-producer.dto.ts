import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProductProducerDto {

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;
}
