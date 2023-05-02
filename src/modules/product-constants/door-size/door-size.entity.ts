import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('door_size')
export class DoorSizeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
