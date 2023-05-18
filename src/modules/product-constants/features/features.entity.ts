import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('features')
export class FeaturesEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
