import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('child_lock')
export class ChildLockEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
