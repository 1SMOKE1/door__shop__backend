import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(['name'], {unique: true})
@Entity('cameras_count')
export class CamerasCountEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;
}
