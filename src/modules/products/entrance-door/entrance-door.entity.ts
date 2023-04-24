import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "entrance_door" })
export class EntranceDoorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name: string;

  @ManyToOne(() => ProductProducerEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
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

  @Column("text", { array: true, default: []})
  amount_of_sealing_materials: string[];

  @Column("text", { array: true, default: []})
  fabric_material: string[];

  @Column("text", { array: true, default: [] })
  purpose: string[];

  @Column("text", { array: true, default: [] })
  opening_method: string[];

  @Column("text", { array: true, default: [] })
  covering: string[];

  @Column("text", { array: true, default: [] })
  frame_material: string[];

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("text", { array: true, default: [] })
  images: string[];

  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;
}
