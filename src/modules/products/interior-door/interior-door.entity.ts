import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FurnitureEntity } from "../furniture/furniture.entity";

@Entity({ name: "interior_door" })
export class InteriorDoorEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

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
  fabric_material_height: number;

  @Column("bigint", {array: true})
  fabric_material_width: string[];

  @Column("text", {array: true})
  door_isolation: string[];

  @Column("text", {array: true})
  door_frame_material: string[];

  @Column("text", {array: true})
  door_selection_board: string[];

  @Column("text", {array: true})
  door_welt: string[];

  @ManyToMany(() => FurnitureEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinTable()
  door_hand: FurnitureEntity[];

  @ManyToMany(() => FurnitureEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinTable()
  door_mechanism: FurnitureEntity[];

  @ManyToMany(() => FurnitureEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinTable()
  door_loops: FurnitureEntity[];

  @ManyToMany(() => FurnitureEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinTable()
  door_stopper: FurnitureEntity[];

  @Column("text", {array: true})
  door_sliding_system: string[];

  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("text", {array: true})
  images: string[];
}
