import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";

export interface IProduct{
  id: number;
  name: string, // Назва
  product_producer: ProductProducerEntity,
  type_of_product: TypeOfProductEntity
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  price: number, // Ціна
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