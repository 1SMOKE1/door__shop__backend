import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FurnitureEntity } from "../furniture/furniture.entity";
import { FabricMaterialWidthEntity } from "src/modules/product-constants/fabric-material-width/fabric-material-width.entity";
import { DoorIsolationEntity } from "src/modules/product-constants/door-isolation/door-isolation.entity";
import { DoorFrameMaterialEntity } from "src/modules/product-constants/door-frame-material/door-frame-material.entity";
import { DoorSelectionBoardEntity } from "src/modules/product-constants/door-selection-board/door-selection-board.entity";
import { DoorWeltEntity } from "src/modules/product-constants/door-welt/door-welt.entity";
import { DoorSlidingSystemEntity } from "src/modules/product-constants/door-sliding-system/door-sliding-system.entity";

@Entity({ name: "interior_door" })
export class InteriorDoorEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @ManyToOne(() => ProductProducerEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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

  @Column("double precision", {default: 0})
  fabric_material_thickness: number;

  @Column("double precision", {default: 0})
  fabric_material_height: number;

  @ManyToMany(() => FabricMaterialWidthEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  fabric_material_width: FabricMaterialWidthEntity[];

  @ManyToMany(() => DoorIsolationEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_isolation: DoorIsolationEntity[];

  @ManyToMany(() => DoorFrameMaterialEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_frame_material: DoorFrameMaterialEntity[];

  @ManyToMany(() => DoorSelectionBoardEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_selection_board: DoorSelectionBoardEntity[];

  @ManyToMany(() => DoorWeltEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_welt: DoorWeltEntity[];

  @ManyToMany(() => FurnitureEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_hand: FurnitureEntity[];

  @ManyToMany(() => FurnitureEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_mechanism: FurnitureEntity[];

  @ManyToMany(() => FurnitureEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_loops: FurnitureEntity[];

  @ManyToMany(() => FurnitureEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_stopper: FurnitureEntity[];

  @ManyToMany(() => DoorSlidingSystemEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_sliding_system: DoorSlidingSystemEntity[];
  
  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("text", {array: true})
  images: string[];
}
