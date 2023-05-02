import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { FurnitureEntity } from "../furniture/furniture.entity";


@Entity("entrance_door")
export class EntranceDoorEntity {
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

  @Column("bigint", {default: 0})
  fabric_material_thickness: number;

  @Column("bigint", {default: 0})
  frame_material_thickness: number;

  @Column("text", {array: true})
  door_insulation: string[];

  @Column("text", {array: true})
  covering: string[];

  @Column("bool", {default: false})
  door_peephole: boolean;

  @Column("text", {array: true})
  opening_type: string[];

  @Column("text", {array: true})
  size: string[];

  @ManyToOne(() => FurnitureEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  lower_lock: FurnitureEntity | null;

  @ManyToOne(() => FurnitureEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  })
  upper_lock: FurnitureEntity | null;

  @Column("text", {array: true})
  weight: string[];

  @Column("double precision", {default: 0})
  metal_thickness: number;

  @Column("text", {array: true})
  frame_material_construction?: string[];

  @Column("text", {array: true})
  sealer_circuit?: string[];

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("text", { array: true, default: [] })
  images: string[];

  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;
}
