import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";

export interface IProductProducer{
  name: string;
  typeOfProduct: TypeOfProductEntity
}