import { AmountOfSealingMaterialsEnum } from "src/enums/amount-of-sealing-materials.enum";
import { ConstructionWindowEnum } from "src/enums/construction-window.enum";
import { CountryEnum } from "src/enums/country.enum";
import { CoveringEnum } from "src/enums/covering.enum";
import { FabricMaterialEnum } from "src/enums/fabric-material.enum";
import { FinishingTheSurfaceEnum } from "src/enums/finishing-the-surface.enum";
import { FrameMaterialEntranceDoorEnum } from "src/enums/frame-material-entrance-door.enum";
import { FrameMaterialInteriorDoorEnum } from "src/enums/frame-material-interior-door.enum";
import { GlassUnitWindowEnum } from "src/enums/glass-unit-window.enum";
import { GlassesWindowEnum } from "src/enums/glasses-window.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { InstallationTypeEnum } from "src/enums/installation-type.enum";
import { LaminationWindowEnum } from "src/enums/lamination-window.enum";
import { OpeningMethodEnum } from "src/enums/opening-method.enum";
import { OpeningTypeEnum } from "src/enums/opening-type.enum";
import { ProfileWindowEnum } from "src/enums/profile-window.enum";
import { PuproseEnum } from "src/enums/purpose.enum";
import { StateEnum } from "src/enums/state.enum";
import { StructuralFeaturesEnum } from "src/enums/structural-features.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";

export interface IProduct{
  name: string, // Назва
  product_producer: ProductProducerEntity,
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  state: StateEnum, // Стан
  price: number, // Ціна
  installation_price: number, // Ціна з установкою
  in_stock: InStockEnum, // На складі
  amount_of_sealing_materials?: AmountOfSealingMaterialsEnum[], // Кількість ущільнюючих контурів
  fabric_material?: FabricMaterialEnum[], // Матеріл дверного полотна
  purpose?: PuproseEnum[], // Призначення двері
  covering?:CoveringEnum[], // Покриття
  frame_material?: FrameMaterialEntranceDoorEnum[] 
  | FrameMaterialInteriorDoorEnum[], // Матеріал дверної коробки
  profile?: ProfileWindowEnum[], // Профіль 
  construction?: ConstructionWindowEnum[], // Конструкція
  glass_unit?: GlassUnitWindowEnum[], // Стеклопакети
  lamination?: LaminationWindowEnum[] , // Ламінація
  glasses?: GlassesWindowEnum[], // Стекла
  finishing_the_surface?: FinishingTheSurfaceEnum[], // Оздоблення поверхні
  structural_features?: StructuralFeaturesEnum[], // Конструктивні особливості
  opening_type?: OpeningTypeEnum[], // Тип відкривання
  installation_type?: InstallationTypeEnum[], // Тип монтажу
  opening_method?: OpeningMethodEnum[], // Спосіб відкривання
  home_page?: boolean,
  img_main?: string,
  img_1?: string,
  img_2?: string,
  img_3?: string,
  img_4?: string,
  description?: string, // Опис
}