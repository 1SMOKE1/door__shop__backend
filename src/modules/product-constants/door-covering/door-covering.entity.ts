import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name: 'door_covering'})
export class DoorCoveringEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;

}
