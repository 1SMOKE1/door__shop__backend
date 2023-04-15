import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class CreateProductProducerDto {
  name: string;
  type_of_product_name: TypeOfProductEnum;
}
