import { KindOfPayvmentEnum } from "../enum/kind-of-payvment.enum";
import { ICartLine } from "../interfaces/ICartLine";

export class UpdateOrderDto {

  name: string;

  phone: string;

  address: string;

  email: string;

  cartLines: ICartLine[] & JSON;
  
  shiped: boolean;
  
  totalCost: number;
  
  kindOfPayvment: KindOfPayvmentEnum;
}

