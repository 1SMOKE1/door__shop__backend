import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsInt, IsArray, IsOptional } from "class-validator";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { StateEnum } from "src/enums/state.enum";
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
