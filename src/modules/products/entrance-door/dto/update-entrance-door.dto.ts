import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsInt, IsArray, IsOptional } from "class-validator";
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
  fabricMaterialThickness: string[];

  @IsArray()
  fabricMaterialHeight: string[];

  @IsArray()
  fabricMaterialWidth: string[];

  @IsArray()
  noiseIsolation: string[];

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
  doorStopper: string[];

  @IsArray()
  doorSlidingSystem: string[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images: string[];

  @IsOptional()
  description?: string;
}
