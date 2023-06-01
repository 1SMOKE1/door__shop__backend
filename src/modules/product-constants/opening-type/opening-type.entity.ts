import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Index(['name'], {unique: true})
@Entity({name: 'opening_type'})
export class OpeningTypeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
