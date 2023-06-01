import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(['name'], {unique: true})
@Entity('features')
export class FeaturesEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
