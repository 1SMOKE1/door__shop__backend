import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

// Ширина полотна
@Index(['name'], {unique: true})
@Entity({name: 'fabric_material_width'})
export class FabricMaterialWidthEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
