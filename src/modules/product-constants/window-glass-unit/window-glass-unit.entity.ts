import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'window_glass_unit'})
export class WindowGlassUnitEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;
}
