import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('window_profile')
export class WindowProfileEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
