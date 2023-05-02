import { IProduct } from "src/modules/products/interfaces/IProduct";
import { productMultiType } from "src/types/productMultiType";

export interface IGetProducts{
  products: productMultiType[] & IProduct[];
  productsLength: number;
}