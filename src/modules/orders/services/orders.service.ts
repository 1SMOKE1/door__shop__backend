import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ICartLine } from '../interfaces/ICartLine';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly mailerService: MailerService
  ){}

  async findAll () {
    return await this.orderRepository.find()
  }

  async findById (id: number) {
    return await this.orderRepository.findOneBy({id});
  }

  async createOne (body: CreateOrderDto){

    const {
      name,
      phone,
      address,
      email,
      cartLines, 
      totalCost,
      kindOfPayvment
    } = body

    const newOrderBody: OrderEntity = {
      ...body,
      total_cost: totalCost,
      kind_of_payvment: kindOfPayvment,
      cart_lines: cartLines
    }

    try{
      await this.mailerService.sendMail({
        from: 'Doorshop.dp.ua@gmail.com',
        to: 'chumak.dp.ua@gmail.com', // chumak.dp.ua@gmail.com
        subject: `Замовлення З door_shop`,
        html: `
        <h1>Ім'я замовника: ${name}</h1>
        <p>Адресса замовника: ${address}</p>
        <p>Email: ${email}</p>
        <p>Кінцева ціна замовлення: ${totalCost} грн</p>
        <p>Телефон замовника: ${phone}</p>
        <p>Тип оплати замовлення: ${kindOfPayvment}</p>
        <div style="margin-bottom: 20px;">Товари замовника: 
          <div style="display: flex;">${this.getCartLinesHTML(cartLines)}</div>
        </div>
        `,
        attachments: this.getCartLinesImages(cartLines)        
      })
    } catch (err) {
      throw new HttpException('Incorrect some data for emailing to owner', HttpStatus.CONFLICT);
    }
    

    
    const newOrder = this.orderRepository.create(newOrderBody);
    return await this.orderRepository.save(newOrder);
  }





  private getCartLinesImages(arr: ICartLine[]){
    return arr.map((el: ICartLine) => {
        const filename = el.product.img_main.split('\\').pop();
        const cid = filename.split('.').shift();
        return {
          filename,
          path: el.product.img_main,
          cid
        }
      }
    )
  }

  private getCartLinesHTML(arr: ICartLine[]) { 
    let txt = ''; 

    for(const item of arr){

      const cid = item.product.img_main.split('\\').pop().split('.').shift();

      txt +=
        `
        <div class="card-product">
          <div class="card-product-img-wrap">
            <img style="width: 20%;" src=cid:${cid} alt="">
          </div>
          <div class="card-product-body">
            <h2 class="font-h2"></h2>
            <p>ID продукту: ${item.product.id}</p>
            <p>Назва продукту: ${item.product.name}</p>
            <p>Кількість: ${item.quantity}</p>
            <p>Ціна за одиницю товару: ${item.product.price}.00 грн</p>
          </div>
        </div><br><br><br>`;
    }
    return txt; 
  }

}
