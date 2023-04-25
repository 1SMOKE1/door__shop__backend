import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('free_zamir')
export class FreeZamirEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  address: string;

  @Column('date', {default: new Date()})
  createdAt: Date;

}
