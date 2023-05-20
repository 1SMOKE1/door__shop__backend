import { IProductCalculator } from "./IProductCalculator";


export interface ICartLine{
  quantity: number;
  product: IProductCalculator;

  get subTotal(): number;
  increase(): void;
  decrease(): void;
}
