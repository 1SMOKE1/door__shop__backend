import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Index(['name'], {unique: true})
@Entity('door_size')
export class DoorSizeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
