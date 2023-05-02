import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'door_sliding_system'})
export class DoorSlidingSystemEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
