import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { KindOfPayvmentEnum } from "./enum/kind-of-payvment.enum";



@Entity({name: 'order'})
export class OrderEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({type: 'varchar'})
  name: string

  @Column({type: 'varchar'})
  phone: string;

  @Column({type: 'varchar'})
  address: string;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'jsonb'})
  cart_lines: JSON;

  @Column({type: 'boolean', default: false})
  shiped: boolean;

  @Column({type: 'int'})
  total_cost: number;

  @Column({type: 'varchar'})
  kind_of_payvment: KindOfPayvmentEnum;



}
