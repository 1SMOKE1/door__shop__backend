import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('section_count')
export class SectionCountEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
