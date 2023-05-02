import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Вага
@Entity("door_weight")
export class DoorWeightEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
