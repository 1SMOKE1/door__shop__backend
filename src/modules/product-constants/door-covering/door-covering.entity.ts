import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Index(['name'], {unique: true})
@Entity({name: 'door_covering'})
export class DoorCoveringEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
