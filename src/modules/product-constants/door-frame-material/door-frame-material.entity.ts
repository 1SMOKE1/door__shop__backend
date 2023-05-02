import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Дверний короб
@Entity('door_frame_material')
export class DoorFrameMaterialEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

}
