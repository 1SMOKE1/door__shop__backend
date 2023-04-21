import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'window_profile'})
export class WindowProfileEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;
}