import { CountryEnum } from "src/enums/country.enum";
import { FinishingTheSurfaceEnum } from "src/enums/finishing-the-surface.enum";
import { FrameMaterialInteriorDoorEnum } from "src/enums/frame-material-interior-door.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { InstallationTypeEnum } from "src/enums/installation-type.enum";
import { OpeningMethodEnum } from "src/enums/opening-method.enum";
import { OpeningTypeEnum } from "src/enums/opening-type.enum";
import { StateEnum } from "src/enums/state.enum";
import { StructuralFeaturesEnum } from "src/enums/structural-features.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class UpdateInteriorDoorDto {

  name: string;

  productProducerName: string;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  state: StateEnum;

  price: number;

  installationPrice: number;

  inStock: InStockEnum;

  finishingTheSurface: FinishingTheSurfaceEnum[];

  frameMaterial: FrameMaterialInteriorDoorEnum[];

  structuralFeatures: StructuralFeaturesEnum[];

  openingType: OpeningTypeEnum[];

  installationType: InstallationTypeEnum[];

  openingMethod: OpeningMethodEnum[];

  homePage?: boolean;

  img_main?: string;

  img_1?: string;

  img_2?: string;

  img_3?: string;

  img_4?: string;

  description?: string;
}
