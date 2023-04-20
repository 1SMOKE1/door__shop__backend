import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProfileWindowEnum } from "src/enums/profile-window.enum";
import { StateEnum } from "src/enums/state.enum";
import { ConstructionWindowEnum } from "src/enums/construction-window.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GlassUnitWindowEnum } from "src/enums/glass-unit-window.enum";
import { LaminationWindowEnum } from "src/enums/lamination-window.enum";
import { GlassesWindowEnum } from "src/enums/glasses-window.enum";
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
  profile: ProfileWindowEnum[];

  @Column("text", {array: true})
  construction: ConstructionWindowEnum[];

  @Column("text", {array: true})
  glass_unit: GlassUnitWindowEnum[];

  @Column("text", {array: true})
  lamination: LaminationWindowEnum[];

  @Column("text", {array: true})
  glasses: GlassesWindowEnum[];

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
