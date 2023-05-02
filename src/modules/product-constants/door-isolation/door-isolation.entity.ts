import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Дверна ізоляція
@Entity({name: 'door_isolation'})
export class DoorIsolationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
