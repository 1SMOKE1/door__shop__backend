import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";



@Entity({name: "window"})
export class WindowEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name: string;

  @ManyToOne(() => ProductProducerEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  product_producer: ProductProducerEntity | null;

  @ManyToOne(() => TypeOfProductEntity)
  type_of_product: TypeOfProductEntity;

  @Column("varchar")
  country: CountryEnum;

  @Column("varchar")
  guarantee: GuaranteeEnum;

  @Column("bigint", {default: 0})
  price: number;

  @Column("varchar")
  in_stock: InStockEnum;

  @Column("text", {array: true})
  mosquito_net: string[];

  @Column("text", {array: true})
  window_sill: string[];

  @Column("text", {array: true})
  window_hand: string[];

  @Column("text", {array: true})
  child_lock: string[];

  @Column("text", {array: true})
  housewife_stub: string[];

  @Column("text", {array: true})
  glass_pocket_add: string[];

  @Column("text", {array: true})
  lamination: string[];

  @Column("text", {array: true})
  profile: string[];

  @Column("bigint", {default: 0})
  window_height: number;

  @Column("bigint", {default: 0})
  window_width: number;
  
  @Column("text", {array: true})
  cameras_count: string[];

  @Column("text", {array: true})
  features: string[];

  @Column("text", {array: true})
  sections_count: string[];

  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("text", {array: true})
  images: string[];

}
