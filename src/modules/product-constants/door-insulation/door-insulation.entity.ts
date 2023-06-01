import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// Утеплення
@Index(['name'], {unique: true})
@Entity("door_insulation")
export class DoorInsulationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
