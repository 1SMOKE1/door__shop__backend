import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsNumber, IsInt } from "class-validator";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class UpdateFurnitureDto {

  @IsNotEmpty()
  name: string;

  @IsOptional()
  productProducerName: string;

  @IsOptional()
  typeOfProductName: TypeOfProductEnum;

  @IsNotEmpty()
  country: CountryEnum;

  @IsNotEmpty()
  guarantee: GuaranteeEnum;

  @IsNotEmpty()
  state: StateEnum;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  installationPrice: number;

  @IsNotEmpty()
  inStock: InStockEnum;

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images?: string[];

  @IsOptional()
  description?: string;
}
