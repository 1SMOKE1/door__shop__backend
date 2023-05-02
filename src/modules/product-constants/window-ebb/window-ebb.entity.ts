import { PrimaryGeneratedColumn, Column } from "typeorm";

// Відлив
export class WindowEbbEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
