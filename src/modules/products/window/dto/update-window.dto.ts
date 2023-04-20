import { ConstructionWindowEnum } from "src/enums/construction-window.enum";
import { CountryEnum } from "src/enums/country.enum";
import { GlassUnitWindowEnum } from "src/enums/glass-unit-window.enum";
import { GlassesWindowEnum } from "src/enums/glasses-window.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { LaminationWindowEnum } from "src/enums/lamination-window.enum";
import { ProfileWindowEnum } from "src/enums/profile-window.enum";
import { StateEnum } from "src/enums/state.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class UpdateWindowDto {

  
  name: string;

  productProducerName: string;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  state: StateEnum;

  price: number;

  installationPrice: number;

  inStock: InStockEnum;

  profile: ProfileWindowEnum[];

  construction: ConstructionWindowEnum[];

  glassUnit: GlassUnitWindowEnum[];

  lamination: LaminationWindowEnum[];

  glasses: GlassesWindowEnum[];

  homePage?: boolean;

  img_main?: string;

  img_1?: string;

  img_2?: string;

  img_3?: string;

  img_4?: string;

  description?: string;
}
