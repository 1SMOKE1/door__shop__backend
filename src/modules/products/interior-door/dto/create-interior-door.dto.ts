import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsInt, IsArray, IsOptional } from "class-validator";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class CreateInteriorDoorDto {

  @IsNotEmpty()
  name: string;

  productProducerName: string | null;

  @IsNotEmpty() 
  typeOfProductName: TypeOfProductEnum;

  @IsNotEmpty()
  country: CountryEnum;

  @IsNotEmpty()
  guarantee: GuaranteeEnum;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  price: number | string;

  @IsNotEmpty()
  inStock: InStockEnum;

  @IsNumber()
  @Type(() => Number)
  @IsInt()
  fabricMaterialThickness: number;

  @IsNumber()
  @Type(() => Number)
  @IsInt()
  fabricMaterialHeight: number;

  @IsArray()
  fabricMaterialWidth: string[];

  @IsArray()
  doorIsolation: string[];

  @IsArray()
  doorFrameMaterial: string[];

  @IsArray()
  doorSelectionBoard: string[];

  @IsArray()
  doorWelt: string[];

  @IsArray()
  doorHand: string[];

  @IsArray()
  doorLoops: string[];

  @IsArray()
  doorMechanism: string[];

  @IsArray()
  doorStopper: string[];

  @IsArray()
  doorSlidingSystem: string[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images?: string[];

  @IsOptional()
  description?: string;

  @IsOptional()
  choosenImage: number;
}
