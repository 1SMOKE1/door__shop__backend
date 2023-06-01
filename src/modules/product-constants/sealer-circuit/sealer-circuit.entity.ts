import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(['name'], {unique: true})
@Entity("sealer_circuit")
export class SealerCircuitEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
