import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('free_consultation')
export class FreeConsultationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  phone: string;

  @Column('date', {default: new Date()})
  createdAt: Date;
}
