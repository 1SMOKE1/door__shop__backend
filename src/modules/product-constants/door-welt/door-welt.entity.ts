import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// Лиштва
@Index(['name'], {unique: true})
@Entity({name: 'door_welt'})
export class DoorWeltEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
