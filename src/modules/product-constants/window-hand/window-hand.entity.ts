import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('window_hand')
export class WindowHandEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
