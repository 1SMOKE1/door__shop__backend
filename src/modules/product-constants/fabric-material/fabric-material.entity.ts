import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({name: 'fabric_material'})
export class FabricMaterialEntity { 
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;
}
