import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TypeOfProductEntity } from "../type-of-products/type-of-product.entity";


@Entity({name: 'product_producers'})
export class ProductProducerEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name: string;

  @ManyToOne(() => TypeOfProductEntity)
  type_of_product: TypeOfProductEntity;
}
