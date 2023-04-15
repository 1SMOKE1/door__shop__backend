import { AmountOfSealingMaterialsEnum } from "src/enums/amount-of-sealing-materials.enum";
import { CountryEnum } from "src/enums/country.enum";
import { CoveringEnum } from "src/enums/covering.enum";
import { FabricMaterialEnum } from "src/enums/fabric-material.enum";
import { FrameMaterialEntranceDoorEnum } from "src/enums/frame-material-entrance-door.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { OpeningMethodEnum } from "src/enums/opening-method.enum";
import { PuproseEnum } from "src/enums/purpose.enum";
import { StateEnum } from "src/enums/state.enum";



export class UpdateEntranceDoorDto {

  name: string;

  productProducerName: string;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  state: StateEnum;

  price: number;

  installationPrice: number;

  inStock: InStockEnum;

  amountOfSealingMaterials: AmountOfSealingMaterialsEnum[];

  fabricMaterial: FabricMaterialEnum[];

  purpose: PuproseEnum[];

  openingMethod: OpeningMethodEnum[];

  covering: CoveringEnum[];

  frameMaterial: FrameMaterialEntranceDoorEnum[];

  homePage?: boolean;

  img_main?: string;

  img_1?: string;

  img_2?: string;

  img_3?: string;

  img_4?: string;

  description?: string;
}
