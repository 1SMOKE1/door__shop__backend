import { Type } from "class-transformer";
import { IsNotEmpty, IsInt, IsArray, IsOptional, IsNumberString } from "class-validator";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class CreateWindowDto {

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
  @IsNumberString()
  @Type(() => Number)
  @IsInt()
  price: number;

  @IsNotEmpty()
  inStock: InStockEnum;

  @IsArray()
  mosquitoNet: string[];

  @IsArray()
  windowSill: string[];

  @IsArray()
  windowEbb: string[];

  @IsArray()
  windowHand: string[];

  @IsArray()
  childLock: string[];

  @IsArray()
  housewifeStub: string[];

  @IsArray()
  glassPocketAdd: string[];

  @IsArray()
  lamination: string[];

  @IsArray()
  profile: string[];

  @IsNotEmpty()
  @IsNumberString()
  @Type(() => Number)
  @IsInt()
  windowHeight: number;

  @IsNotEmpty()
  @IsNumberString()
  @Type(() => Number)
  @IsInt()
  windowWidth: number;

  @IsArray()
  camerasCount: string[];

  @IsArray()
  features: string[];

  @IsArray()
  sectionCount: string[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images: string[];

  @IsOptional()
  description?: string;
}
