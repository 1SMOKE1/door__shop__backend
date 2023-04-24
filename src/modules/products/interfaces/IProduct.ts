import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";

export interface IProduct{
  id: number;
  name: string, // Назва
  product_producer: ProductProducerEntity,
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  state: StateEnum, // Стан
  price: number, // Ціна
  installation_price: number, // Ціна з установкою
  in_stock: InStockEnum, // На складі
  amount_of_sealing_materials?: string[], // Кількість ущільнюючих контурів
  fabric_material?: string[], // Матеріл дверного полотна
  purpose?: string[], // Призначення двері
  covering?: string[], // Покриття
  frame_material?: string[], // Матеріал дверної коробки
  profile?: string[], // Профіль 
  construction?: string[], // Конструкція
  glass_unit?: string[], // Стеклопакети
  lamination?: string[] , // Ламінація
  glasses?: string[], // Стекла
  finishing_the_surface?: string[], // Оздоблення поверхні
  structural_features?: string[], // Конструктивні особливості
  opening_type?: string[], // Тип відкривання
  installation_type?: string[], // Тип монтажу
  opening_method?: string[], // Спосіб відкривання
  home_page?: boolean,
  images: string[],
  description?: string, // Опис
}