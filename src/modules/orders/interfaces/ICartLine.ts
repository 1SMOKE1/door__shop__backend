import { IProduct } from "src/modules/products/interfaces/IProduct";


export interface ICartLine{
  quantity: number;
  product: IProduct;

  get subTotal(): number;
  increase(): void;
  decrease(): void;
}
