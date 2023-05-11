import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsInt, IsArray, IsOptional, IsBoolean } from "class-validator";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";



export class UpdateEntranceDoorDto {

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
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  price: number;

  @IsNotEmpty()
  inStock: InStockEnum;

  @IsArray()
  doorInsulation: string[];

  @IsArray()
  covering: string[];

  @IsBoolean()
  doorPeephole: boolean

  @IsArray()
  openingType: string[];

  @IsArray()
  size: string[];

  @IsArray()
  lower_lock: string[];

  @IsArray()
  upper_lock: string[];

  @IsArray()
  weight: string[];

  @IsNumber()
  @Type(() => Number)
  @IsInt()
  metalThickness: number;

  @IsArray()
  frameMaterialConstruction: string[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images: string[];

  @IsOptional()
  description?: string;
}
