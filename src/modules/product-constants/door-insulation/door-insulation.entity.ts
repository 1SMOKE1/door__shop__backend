import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Утеплення
@Entity("door_insulation")
export class DoorInsulationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
