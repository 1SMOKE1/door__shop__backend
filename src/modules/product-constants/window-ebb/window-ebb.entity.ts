import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

// Відлив
@Index(['name'], {unique: true})
@Entity('window_ebb')
export class WindowEbbEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
