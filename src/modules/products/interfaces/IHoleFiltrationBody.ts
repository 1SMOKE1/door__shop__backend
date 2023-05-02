
import { ISliderValue } from "./ISliderValue";
import { IProductProducer } from "src/interfaces/IProductProducer";

export interface IHoleFiltrationBody{

  checkboxArr: IProductProducer[],
  sliderValue: ISliderValue,
  searchValue: string

}