import { CountryEnum } from "src/enums/country.enum";
import { FinishingTheSurfaceEnum } from "src/enums/finishing-the-surface.enum";
import { FrameMaterialInteriorDoorEnum } from "src/enums/frame-material-interior-door.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { InstallationTypeEnum } from "src/enums/installation-type.enum";
import { OpeningMethodEnum } from "src/enums/opening-method.enum";
import { OpeningTypeEnum } from "src/enums/opening-type.enum";
import { StateEnum } from "src/enums/state.enum";
import { StructuralFeaturesEnum } from "src/enums/structural-features.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "interior_door" })
export class InteriorDoorEntity {
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

  @Column("text", { array: true })
  finishing_the_surface: FinishingTheSurfaceEnum[];

  @Column("text", { array: true })
  frame_material: FrameMaterialInteriorDoorEnum[];

  @Column("text", { array: true })
  structural_features: StructuralFeaturesEnum[];

  @Column("text", {array: true})
  opening_type: OpeningTypeEnum[];

  @Column("text", {array: true})
  installation_type: InstallationTypeEnum[];

  @Column("text", {array: true})
  opening_method: OpeningMethodEnum[];

  @Column({ type: "varchar", length: 500, default: "Немає опису" })
  description?: string;

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
}
