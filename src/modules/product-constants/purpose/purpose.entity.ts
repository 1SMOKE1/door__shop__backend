import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({name: 'purpose'})
export class PurposeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;
}
