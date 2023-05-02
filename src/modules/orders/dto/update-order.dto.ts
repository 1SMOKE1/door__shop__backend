import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { kindOfPaymentEnum } from "../enum/kind-of-payvment.enum";
import { ICartLine } from "../interfaces/ICartLine";

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  @IsMobilePhone("uk-UA")
  @MinLength(10)
  phone: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  address: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  cartLines: ICartLine[] & JSON;

  @IsNotEmpty()
  @IsBoolean()
  shiped: boolean;

  @IsOptional()
  @IsNumber()
  totalCost: number;

  @IsOptional()
  @IsString()
  kindOfPayment: kindOfPaymentEnum;
}
