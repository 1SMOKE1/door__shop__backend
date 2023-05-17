import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { DoorFrameMaterialEntity } from "src/modules/product-constants/door-frame-material/door-frame-material.entity";
import { DoorIsolationEntity } from "src/modules/product-constants/door-isolation/door-isolation.entity";
import { DoorSelectionBoardEntity } from "src/modules/product-constants/door-selection-board/door-selection-board.entity";
import { DoorWeltEntity } from "src/modules/product-constants/door-welt/door-welt.entity";
import { FabricMaterialWidthEntity } from "src/modules/product-constants/fabric-material-width/fabric-material-width.entity";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { FurnitureEntity } from "../furniture/furniture.entity";
import { DoorSlidingSystemEntity } from "src/modules/product-constants/door-sliding-system/door-sliding-system.entity";
import { DoorInsulationEntity } from "src/modules/product-constants/door-insulation/door-insulation.entity";
import { DoorCoveringEntity } from "src/modules/product-constants/door-covering/door-covering.entity";
import { OpeningTypeEntity } from "src/modules/product-constants/opening-type/opening-type.entity";
import { DoorSizeEntity } from "src/modules/product-constants/door-size/door-size.entity";
import { DoorWeightEntity } from "src/modules/product-constants/door-weight/door-weight.entity";
import { FrameMaterialConstructionEntity } from "src/modules/product-constants/frame-material-construction/frame-material-construction.entity";
import { SealerCircuitEntity } from "src/modules/product-constants/sealer-circuit/sealer-circuit.entity";
import { MosquitNetEntity } from "src/modules/product-constants/mosquit-net/mosquit-net.entity";
import { WindowSillEntity } from "src/modules/product-constants/window-sill/window-sill.entity";
import { WindowEbbEntity } from "src/modules/product-constants/window-ebb/window-ebb.entity";
import { WindowHandEntity } from "src/modules/product-constants/window-hand/window-hand.entity";
import { ChildLockEntity } from "src/modules/product-constants/child-lock/child-lock.entity";
import { HousewifeStubEntity } from "src/modules/product-constants/housewife-stub/housewife-stub.entity";
import { GlassPocketAddEntity } from "src/modules/product-constants/glass-pocket-add/glass-pocket-add.entity";
import { WindowLaminationEntity } from "src/modules/product-constants/window-lamination/window-lamination.entity";
import { WindowProfileEntity } from "src/modules/product-constants/window-profile/window-profile.entity";
import { CamerasCountEntity } from "src/modules/product-constants/cameras-count/cameras-count.entity";
import { FeaturesEntity } from "src/modules/product-constants/features/features.entity";
import { SectionCountEntity } from "src/modules/product-constants/section-count/section-count.entity";

export interface IProduct{
  id: number;
  name: string, // Назва
  product_producer: ProductProducerEntity,
  type_of_product: TypeOfProductEntity
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  price: number, // Ціна
  in_stock: InStockEnum, // На складі
  // interior_door (двері міжкімнатні)
  fabric_material_thickness?: number, // Товщина полотна
  fabric_material_height?: number, // Висота полотна
  fabric_material_width?: FabricMaterialWidthEntity[], // Ширина полотна
  door_isolation?: DoorIsolationEntity[], // Шумоізоляція
  door_frame_material?: DoorFrameMaterialEntity[], // Короб
  door_selection_board?: DoorSelectionBoardEntity[], // Добірна дошка
  door_welt?: DoorWeltEntity[], // Лиштва
  door_hand?: FurnitureEntity[], // Дверна ручка
  door_mechanism?: FurnitureEntity[], // Дверний механізм
  door_loops?: FurnitureEntity[], // Дверні петлі
  door_stopper?: FurnitureEntity[], // Дверний стопор
  door_sliding_system?: DoorSlidingSystemEntity[], // Роздвижна система
  // entrance_door (двері вхідні)
  // fabric_material_thickness?: number, // Товщина полотна
  frame_material_thickness?: number, // Товщина короба
  door_insulation?: DoorInsulationEntity[], // Утеплення
  covering?: DoorCoveringEntity[], // Покриття
  door_peephole?: boolean, // Глазок
  opening_type?: OpeningTypeEntity[], // Тип відкривання
  size?: DoorSizeEntity[], // Розмір
  lower_lock?: FurnitureEntity[]; // Нижній замок
  upper_lock?: FurnitureEntity[]; // Верхній замок
  weight?: DoorWeightEntity[]; // Вага
  metal_thickness?: number; // товщина металу
  frame_material_construction?: FrameMaterialConstructionEntity[]; //конструкція короба
  sealer_circuit?: SealerCircuitEntity[]; // контур ущільнення
  // window (вікна)
  mosquito_net?: MosquitNetEntity[]; // Москітна сітка
  window_sill?: WindowSillEntity[]; // Підвіконня
  window_ebb?: WindowEbbEntity[]; // Відлив
  window_hand?: WindowHandEntity[]; // Віконна ручка
  child_lock?: ChildLockEntity[]; // Дитячий замок
  housewife_stub?: HousewifeStubEntity[]; // Заглушка домогосподарки
  glass_pocket_add?: GlassPocketAddEntity[]; // Доповнення до стеклопакету
  lamination?: WindowLaminationEntity[]; // Ламінація
  profile?: WindowProfileEntity[]; // Профіль
  window_height?: number; // Висота вікна
  window_width?: number; // Ширина вікна
  cameras_count?: CamerasCountEntity[]; // Кількість камер
  features?: FeaturesEntity[]; // Особливості
  section_count?: SectionCountEntity[]; // Кількість секцій


  home_page?: boolean,
  images: string[],
  description?: string, // Опис
}