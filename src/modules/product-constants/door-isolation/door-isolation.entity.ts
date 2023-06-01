import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// Дверна ізоляція
@Index(['name'], {unique: true})
@Entity({name: 'door_isolation'})
export class DoorIsolationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
