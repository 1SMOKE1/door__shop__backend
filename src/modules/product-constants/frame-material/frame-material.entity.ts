import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'frame_material'})
export class FrameMaterialEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;
}
