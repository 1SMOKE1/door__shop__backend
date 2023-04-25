import { IsNotEmpty, IsString, MinLength, IsMobilePhone } from "class-validator";

export class CreateFreeConsultationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('uk-UA')
  @MinLength(10)
  phone: string;
}
