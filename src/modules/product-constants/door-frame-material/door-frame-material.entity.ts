import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// Дверний короб
@Index(['name'], {unique: true})
@Entity('door_frame_material')
export class DoorFrameMaterialEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

}
