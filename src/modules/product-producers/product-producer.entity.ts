import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name: 'product_producers'})
export class ProductProducerEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name: string;
}
