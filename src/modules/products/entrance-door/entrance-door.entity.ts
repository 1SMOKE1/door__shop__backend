import { AmountOfSealingMaterialsEnum } from "src/enums/amount-of-sealing-materials.enum";
import { CountryEnum } from "src/enums/country.enum";
import { CoveringEnum } from "src/enums/covering.enum";
import { FabricMaterialEnum } from "src/enums/fabric-material.enum";
import { FrameMaterialEntranceDoorEnum } from "src/enums/frame-material-entrance-door.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { OpeningMethodEnum } from "src/enums/opening-method.enum";
import { PuproseEnum } from "src/enums/purpose.enum";
import { StateEnum } from "src/enums/state.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "entrance_door" })
export class EntranceDoorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name: string;

  @ManyToOne(() => ProductProducerEntity)
  product_producer: ProductProducerEntity;

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
  amount_of_sealing_materials: AmountOfSealingMaterialsEnum[];

  @Column("text", { array: true })
  fabric_material: FabricMaterialEnum[];

  @Column("text", { array: true })
  purpose: PuproseEnum[];

  @Column("text", { array: true })
  opening_method: OpeningMethodEnum[];

  @Column("text", { array: true })
  covering: CoveringEnum[];

  @Column("text", { array: true })
  frame_material: FrameMaterialEntranceDoorEnum[];

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("varchar", { nullable: true })
  img_main?: string;

  @Column("varchar", { nullable: true })
  img_1?: string;

  @Column("varchar", { nullable: true })
  img_2?: string;

  @Column("varchar", { nullable: true })
  img_3?: string;

  @Column("varchar", { nullable: true })
  img_4?: string;

  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;
}
