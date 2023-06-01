import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// Вага
@Index(['name'], {unique: true})
@Entity("door_weight")
export class DoorWeightEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
