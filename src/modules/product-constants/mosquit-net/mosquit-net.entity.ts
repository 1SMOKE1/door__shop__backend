import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("mosquit_net")
export class MosquitNetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}
