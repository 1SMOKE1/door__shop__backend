import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'window_glasses'})
export class WindowGlassEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;
}
