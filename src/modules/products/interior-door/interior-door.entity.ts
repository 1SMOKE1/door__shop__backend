import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "interior_door" })
export class InteriorDoorEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @ManyToOne(() => ProductProducerEntity)
  product_producer: ProductProducerEntity;

  @ManyToOne(() => TypeOfProductEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
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

  @Column("text", { array: true })
  finishing_the_surface: string[];

  @Column("text", { array: true })
  frame_material: string[];

  @Column("text", { array: true })
  structural_features: string[];

  @Column("text", {array: true})
  opening_type: string[];

  @Column("text", {array: true})
  installation_type: string[];

  @Column("text", {array: true})
  opening_method: string[];

  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("text", {array: true})
  images: string[];
}
