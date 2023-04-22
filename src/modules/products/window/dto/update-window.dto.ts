import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsNumber, IsInt, IsArray } from "class-validator";
import { ConstructionWindowEnum } from "src/enums/construction-window.enum";
import { CountryEnum } from "src/enums/country.enum";
import { GlassUnitWindowEnum } from "src/enums/glass-unit-window.enum";
import { GlassesWindowEnum } from "src/enums/glasses-window.enum";
import { GuaranteeEnum } from "src/enums/guarantee.enum";
import { InStockEnum } from "src/enums/in-stock.enum";
import { LaminationWindowEnum } from "src/enums/lamination-window.enum";
import { ProfileWindowEnum } from "src/enums/profile-window.enum";
import { StateEnum } from "src/enums/state.enum";
import { TypeOfProductEnum } from "src/enums/type-of-product.enum";

export class UpdateWindowDto {

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
  profile: ProfileWindowEnum[];

  @IsArray()  
  construction: ConstructionWindowEnum[];

  @IsArray()  
  glassUnit: GlassUnitWindowEnum[];

  @IsArray()  
  lamination: LaminationWindowEnum[];

  @IsArray()  
  glasses: GlassesWindowEnum[];

  @IsOptional()
  homePage?: boolean;

  @IsOptional()
  images: string[];

  @IsOptional()
  description?: string;
}
