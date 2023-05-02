import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('glass_pocket_add')
export class GlassPocketAddEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
