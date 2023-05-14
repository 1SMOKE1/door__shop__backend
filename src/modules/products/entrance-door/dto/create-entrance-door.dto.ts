import { CountryEnum } from "src/enums/country.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import { Type } from "class-transformer";


export class CreateEntranceDoorDto{

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
  frameMaterialThickness: number;

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

  @IsArray()
  doorHand: string[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images?: string[];

  @IsOptional()
  description?: string;


}


