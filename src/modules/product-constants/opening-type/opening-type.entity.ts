import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'opening_type'})
export class OpeningTypeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;
}
