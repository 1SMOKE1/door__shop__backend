import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";


export interface IExcelProduct{
  name: string, // Назва
  productProducerName: string,
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  price: number, // Ціна
  inStock: InStockEnum, // На складі
  // interior_door (двері міжкімнатні)
  fabricMaterialThickness?: number, // Товщина полотна
  fabricMaterialHeight?: number, // Висота полотна
  fabricMaterialWidth?: string[] | string, // Ширина полотна
  doorIsolation?: string[] | string, // Шумоізоляція
  doorFrameMaterial?: string[] | string, // Короб
  doorSelectionBoard?: string[] | string, // Добірна дошка
  doorWelt?: string[] | string, // Лиштва
  doorHand?: string[] | string, // Дверна ручка
  doorMechanism?: string[] | string, // Дверний механізм
  doorLoops?: string[] | string, // Дверні петлі
  doorStopper?: string[] | string, // Дверний стопор
  doorSlidingSystem?: string[] | string, // Роздвижна система
  // entrance_door (двері вхідні)
  // fabricMaterialThickness?: number, // Товщина полотна
  frameMaterialThickness?: number, // Товщина короба
  doorInsulation?: string[] | string, // Утеплення
  covering?: string[] | string, // Покриття
  doorPeephole?: boolean, // Глазок
  openingType?: string[] | string, // Тип відкривання
  size?: string[] | string, // Розмір
  lowerLock?: string[] | string; // Нижній замок
  upperLock?: string[] | string; // Верхній замок
  weight?: string[] | string; // Вага
  metalThickness?: number; // товщина металу
  frameMaterialConstruction?: string[] | string; //конструкція короба
  sealerCircuit?: string[] | string; // контур ущільнення
  // window (вікна)
  mosquitoNet?: string[] | string; // Москітна сітка
  windowSill?: string[] | string; // Підвіконня
  windowEbb?: string[] | string; // Відлив
  windowHand?: string[] | string; // Віконна ручка
  childLock?: string[] | string; // Дитячий замок
  housewifeStub?: string[] | string; // Заглушка домогосподарки
  glassPocketAdd?: string[] | string; // Доповнення до стеклопакету
  lamination?: string[] | string; // Ламінація
  profile?: string[] | string; // Профіль
  windowHeight?: number; // Висота вікна
  windowWidth?: number; // Ширина вікна
  camerasCount?: string[] | string; // Кількість камер
  features?: string[] | string; // Особливості
  sectionCount?: string[] | string; // Кількість секцій

  homePage?: string,
  images: string[] | string,
  description?: string, // Опис
}