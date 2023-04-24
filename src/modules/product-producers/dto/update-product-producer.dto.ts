import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class UpdateProductProducerDto {

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  typeOfProductName: TypeOfProductEnum;
}
