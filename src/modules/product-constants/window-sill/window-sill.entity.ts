import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("window_sill")
export class WindowSillEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

}
