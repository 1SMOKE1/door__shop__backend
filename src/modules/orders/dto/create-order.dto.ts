import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { KindOfPayvmentEnum } from "../enum/kind-of-payvment.enum";
import { ICartLine } from "../interfaces/ICartLine";

export class CreateOrderDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
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
