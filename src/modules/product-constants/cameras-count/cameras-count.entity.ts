import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cameras_count')
export class CamerasCountEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
