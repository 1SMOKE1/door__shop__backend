import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { ISliderValue } from "./ISliderValue";

export interface IHoleFiltrationBody{

  checkboxArr: ProductProducerEntity[],
  sliderValue: ISliderValue,
  searchValue: string

}