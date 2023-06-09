import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(['name'], {unique: true})
@Entity({name: 'door_selection_board'})
export class DoorSelectionBoardEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'bigint'})
  price: number;
}


