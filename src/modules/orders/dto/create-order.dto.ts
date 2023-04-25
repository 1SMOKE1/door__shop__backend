import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength} from "class-validator";
import { KindOfPayvmentEnum } from "../enum/kind-of-payvment.enum";
import { ICartLine } from "../interfaces/ICartLine";

export class CreateOrderDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('uk-UA')
  @MinLength(10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsArray()
  @ArrayNotEmpty()
  cartLines: ICartLine[] & JSON;
  
  @IsOptional()
  @IsBoolean()
  shiped: boolean;
  
  @IsNumber()
  totalCost: number;
  
  @IsString()
  kindOfPayvment: KindOfPayvmentEnum;
}
