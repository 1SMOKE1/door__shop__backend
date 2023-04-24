import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";



@Entity({name: "window"})
export class WindowEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name: string;

  @ManyToOne(() => ProductProducerEntity)
  product_producer: ProductProducerEntity;

  @ManyToOne(() => TypeOfProductEntity)
  type_of_product: TypeOfProductEntity;

  @Column("varchar")
  country: CountryEnum;

  @Column("varchar")
  guarantee: GuaranteeEnum;

  @Column("varchar")
  state: StateEnum;

  @Column("bigint", {default: 0})
  price: number;

  @Column("bigint", {default: 0})
  installation_price: number;

  @Column("varchar")
  in_stock: InStockEnum;

  @Column("text", {array: true})
  profile: string[];

  @Column("text", {array: true})
  construction: string[];

  @Column("text", {array: true})
  glass_unit: string[];

  @Column("text", {array: true})
  lamination: string[];

  @Column("text", {array: true})
  glasses: string[];

  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("text", {array: true})
  images: string[];

}
