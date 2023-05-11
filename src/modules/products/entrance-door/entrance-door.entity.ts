import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { FurnitureEntity } from "../furniture/furniture.entity";
import { DoorInsulationEntity } from "src/modules/product-constants/door-insulation/door-insulation.entity";
import { DoorCoveringEntity } from "src/modules/product-constants/door-covering/door-covering.entity";
import { OpeningTypeEntity } from "src/modules/product-constants/opening-type/opening-type.entity";
import { DoorSizeEntity } from "src/modules/product-constants/door-size/door-size.entity";
import { DoorWeightEntity } from "src/modules/product-constants/door-weight/door-weight.entity";
import { FrameMaterialConstructionEntity } from "src/modules/product-constants/frame-material-construction/frame-material-construction.entity";
import { SealerCircuitEntity } from "src/modules/product-constants/sealer-circuit/sealer-circuit.entity";


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

  @ManyToMany(() => DoorInsulationEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  door_insulation: DoorInsulationEntity[];

  @ManyToMany(() => DoorCoveringEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  covering: DoorCoveringEntity[];

  @Column("bool", {default: false})
  door_peephole: boolean;

  @ManyToMany(() => OpeningTypeEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  opening_type: OpeningTypeEntity[];

  @ManyToMany(() => DoorSizeEntity,  {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  size: DoorSizeEntity[];

  @ManyToMany(() => FurnitureEntity,  {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  lower_lock: FurnitureEntity[];

  @ManyToMany(() => FurnitureEntity,  {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  upper_lock: FurnitureEntity[];

  @ManyToMany(() => DoorWeightEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  weight: DoorWeightEntity[];

  @Column("double precision", {default: 0})
  metal_thickness: number;

  @ManyToMany(() => FrameMaterialConstructionEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  frame_material_construction: FrameMaterialConstructionEntity[];

  @ManyToMany(() => SealerCircuitEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  sealer_circuit: SealerCircuitEntity[];

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("text", { array: true, default: [] })
  images: string[];

  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;
}
