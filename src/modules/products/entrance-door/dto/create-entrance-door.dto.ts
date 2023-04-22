import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateEntranceDoorDto{

  @IsNotEmpty()
  name: string;

  productProducerName: string;

  @IsNotEmpty() 
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
  price: number | string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  installationPrice: number | string;

  @IsNotEmpty()
  inStock: InStockEnum;

  @IsArray()  
  amountOfSealingMaterials: string[];

  @IsArray()  
  fabricMaterial: string[];

  @IsArray()  
  purpose: string[];

  @IsArray()  
  openingMethod: string[];

  @IsArray()  
  covering: string[];

  @IsArray()  
  frameMaterial: string[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images?: string[];

  @IsOptional()
  description?: string;
}


