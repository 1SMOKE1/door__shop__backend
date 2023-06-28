import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";
import { MosquitNetEntity } from "src/modules/product-constants/mosquit-net/mosquit-net.entity";
import { WindowSillEntity } from "src/modules/product-constants/window-sill/window-sill.entity";
import { WindowHandEntity } from "src/modules/product-constants/window-hand/window-hand.entity";
import { ChildLockEntity } from "src/modules/product-constants/child-lock/child-lock.entity";
import { HousewifeStubEntity } from "src/modules/product-constants/housewife-stub/housewife-stub.entity";
import { GlassPocketAddEntity } from "src/modules/product-constants/glass-pocket-add/glass-pocket-add.entity";
import { WindowLaminationEntity } from "src/modules/product-constants/window-lamination/window-lamination.entity";
import { WindowProfileEntity } from "src/modules/product-constants/window-profile/window-profile.entity";
import { CamerasCountEntity } from "src/modules/product-constants/cameras-count/cameras-count.entity";
import { FeaturesEntity } from "src/modules/product-constants/features/features.entity";
import { SectionCountEntity } from "src/modules/product-constants/section-count/section-count.entity";
import { WindowEbbEntity } from "src/modules/product-constants/window-ebb/window-ebb.entity";



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

  @ManyToMany(() => MosquitNetEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  mosquito_net: MosquitNetEntity[];

  @ManyToMany(() => WindowSillEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  window_sill: WindowSillEntity[];

  @ManyToMany(() => WindowEbbEntity , {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  window_ebb: WindowEbbEntity[];

  @ManyToMany(() => WindowHandEntity,  {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  window_hand: WindowHandEntity[];

  @ManyToMany(() => ChildLockEntity,  {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  child_lock: ChildLockEntity[];

  @ManyToMany(() => HousewifeStubEntity,  {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  housewife_stub: HousewifeStubEntity[];

  @ManyToMany(() => GlassPocketAddEntity,  {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  glass_pocket_add: GlassPocketAddEntity[];

  @ManyToMany(() => WindowLaminationEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  lamination: WindowLaminationEntity[];

  @ManyToMany(() => WindowProfileEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  profile: WindowProfileEntity[];

  @Column("double precision", {default: 0})
  window_height: number;

  @Column("double precision", {default: 0})
  window_width: number;
  
  @ManyToMany(() => CamerasCountEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  cameras_count: CamerasCountEntity[];

  @ManyToMany(() => FeaturesEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  features: FeaturesEntity[];

  @ManyToMany(() => SectionCountEntity, {
    onUpdate:"CASCADE", cascade: true, eager: true
  })
  @JoinTable()
  sections_count: SectionCountEntity[];

  @Column({ type: "text", default: "Немає опису" })
  description?: string;

  @Column("boolean", { default: false })
  home_page?: boolean;

  @Column("text", {array: true})
  images: string[];

  @Column("bigint", {default: 0})
  choosen_image: number;
}
