import { IsNotEmpty, IsString } from "class-validator";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class CreateProductProducerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  typeOfProductName: TypeOfProductEnum;
}
