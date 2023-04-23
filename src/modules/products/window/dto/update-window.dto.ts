import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsNumber, IsInt, IsArray } from "class-validator";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class UpdateWindowDto {

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

  @IsArray()  
  profile: string[];

  @IsArray()  
  construction: string[];

  @IsArray()  
  glassUnit: string[];

  @IsArray()  
  lamination: string[];

  @IsArray()  
  glasses: string[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images: string[];

  @IsOptional()
  description?: string;
}
