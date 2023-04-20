import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'our_work'})
export class OurWorkEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar', nullable: true})
  img_src: string;

  @Column({type: 'varchar', default: 'no alt'})
  img_alt: string;
}
