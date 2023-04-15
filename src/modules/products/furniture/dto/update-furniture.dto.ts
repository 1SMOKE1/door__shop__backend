import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";

export class UpdateFurnitureDto {

  name: string;

  productProducerName: string;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  state: StateEnum;

  price: number;

  installationPrice: number;

  inStock: InStockEnum;

  homePage?: boolean;

  img_main?: string;

  img_1?: string;

  img_2?: string;

  img_3?: string;

  img_4?: string;

  description?: string;
}
