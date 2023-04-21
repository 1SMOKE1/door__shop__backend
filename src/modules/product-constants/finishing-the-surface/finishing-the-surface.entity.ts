import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'finishing_the_surface'})
export class FinishingTheSurfaceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;
}
