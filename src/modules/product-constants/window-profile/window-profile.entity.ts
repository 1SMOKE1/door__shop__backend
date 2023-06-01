import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Index(['name'], {unique: true})
@Entity('window_profile')
export class WindowProfileEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
