import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'amount_of_sealing_materials'})
export class AmountOfSealingMaterialEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar'})
  @Index({ unique: true })
  name: string;

  @Column({type: 'bigint'})
  price: number;

  @Column({type: 'bool', default: false})
  is_using: boolean;

}
