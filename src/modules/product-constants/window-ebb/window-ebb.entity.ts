import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

// Відлив
@Entity('window_ebb')
export class WindowEbbEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
