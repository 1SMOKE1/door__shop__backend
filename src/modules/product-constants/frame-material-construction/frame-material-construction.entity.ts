import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Конструкція короба
@Entity({name: 'frame_material_construction'})
export class FrameMaterialConstructionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
