import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Лиштва
@Entity({name: 'door_welt'})
export class DoorWeltEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
