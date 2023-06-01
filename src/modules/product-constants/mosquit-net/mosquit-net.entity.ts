import { PrimaryGeneratedColumn, Column, Entity, Index } from "typeorm";

@Index(['name'], {unique: true})
@Entity("mosquit_net")
export class MosquitNetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
