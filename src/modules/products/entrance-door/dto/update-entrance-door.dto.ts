import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsInt, IsArray, IsOptional, IsBooleanString } from "class-validator";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";



export class UpdateEntranceDoorDto {

  @IsNotEmpty()
  name: string;

  @IsOptional()
  productProducerName: string | null;

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

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  fabricMaterialThickness: number | string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  frameMaterialThickness: number | string;

  @IsArray()
  doorInsulation: string[];

  @IsArray()
  covering: string[];

  @IsBooleanString()
  doorPeephole: boolean

  @IsArray()
  openingType: string[];

  @IsArray()
  size: string[];

  @IsArray()
  lowerLock: string[];

  @IsArray()
  upperLock: string[];

  @IsArray()
  weight: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  metalThickness: number;

  @IsArray()
  frameMaterialConstruction: string[];

  @IsArray()
  sealerCircuit: string[];

  @IsArray()
  doorHand: string[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images: string[];

  @IsOptional()
  description?: string;

  @IsOptional()
  choosenImage: number;
}
