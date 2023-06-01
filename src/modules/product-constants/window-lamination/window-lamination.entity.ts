import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(['name'], {unique: true})
@Entity('window_lamination')
export class WindowLaminationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

}
