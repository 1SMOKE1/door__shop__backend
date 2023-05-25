import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsNumber, IsInt, IsArray } from "class-validator";
import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class UpdateWindowDto {

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

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  windowHeight: number;

  @IsOptional()
  @IsNumber()
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

  @IsOptional()
  choosenImage: number;
}
