import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsInt, IsArray, IsOptional } from "class-validator";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class CreateInteriorDoorDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty() 
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
  finishingTheSurface: string[];

  @IsArray()  
  frameMaterial: string[];

  @IsArray()  
  structuralFeatures: string[];

  @IsArray()  
  openingType: string[];

  @IsArray()  
  installationType: string[];

  @IsArray()  
  openingMethod: string[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images?: string[];

  @IsOptional()
  description?: string;
}
