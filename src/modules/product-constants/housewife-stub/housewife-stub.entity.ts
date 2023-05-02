import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('housewife_stub')
export class HousewifeStubEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
