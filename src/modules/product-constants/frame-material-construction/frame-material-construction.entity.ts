import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

// Конструкція короба
@Index(['name'], {unique: true})
@Entity({name: 'frame_material_construction'})
export class FrameMaterialConstructionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
