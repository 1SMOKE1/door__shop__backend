import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name: 'opening_method'})
export class OpeningMethodEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;
}
