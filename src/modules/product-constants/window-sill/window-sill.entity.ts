import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Index(['name'], {unique: true})
@Entity("window_sill")
export class WindowSillEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

}
