import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sealer_circuit")
export class SealerCircuitEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
