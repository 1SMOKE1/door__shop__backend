import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TypeOfProductEnum } from "../../enums/type-of-product.enum";

@Entity({ name: "type_of_products" })
export class TypeOfProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name: TypeOfProductEnum;
}
