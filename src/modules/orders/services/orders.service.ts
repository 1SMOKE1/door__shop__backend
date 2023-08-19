import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "../order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { MailerService } from "@nestjs-modules/mailer";
import userMessage from "src/utils/emailing/user-message";
import { UpdateOrderDto } from "../dto/update-order.dto";
import ownerMessage from "src/utils/emailing/owner-message";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findAll() {
    return await this.orderRepository.find();
  }

  async findById(id: number) {
    return await this.orderRepository.findOneBy({ id });
  }

  async createOne(body: CreateOrderDto) {
    if (!body) throw new HttpException("No body", HttpStatus.FORBIDDEN);

    const { name, phone, address, email, cartLines, totalCost, kindOfPayment, shiped } = body;

    const newOrderBody: OrderEntity = {
      name,
      phone,
      address,
      email,
      total_cost: totalCost,
      kind_of_payment: kindOfPayment,
      cart_lines: cartLines,
      shiped,
    };

    // client email

    const [userMessageSend, ownerMessageSend] = await Promise.all([
      userMessage(name, email, totalCost, phone, cartLines),
      ownerMessage(name, email, totalCost, phone, address, kindOfPayment, cartLines)
    ])

    const chachedUserMessage = await this.cacheManager.get('user_message');
    const chachedOwnerMessage = await this.cacheManager.get('owner_message');

    if(chachedUserMessage){
      return chachedUserMessage
    }

    if(chachedOwnerMessage){
      return chachedOwnerMessage
    }



    try{
      await Promise.all([
        this.mailerService.sendMail(userMessageSend), 
        this.mailerService.sendMail(ownerMessageSend)
      ])

      
    } catch (err) {
      throw new HttpException("Incorrect user email", HttpStatus.CONFLICT);
    }


    const newOrder = this.orderRepository.create(newOrderBody);

    await Promise.all([
      this.cacheManager.set('user_message', chachedUserMessage, 60 * 60 * 1000),
      this.cacheManager.set('owner_message', chachedOwnerMessage, 60 * 60 * 1000)
    ])


    return await this.orderRepository.save(newOrder);
  }

  async updateById(id: number, body: UpdateOrderDto) {
    if (!body) throw new HttpException("No body", HttpStatus.FORBIDDEN);

    const updatedItem = await this.findById(id);

    if (updatedItem == null) throw new HttpException(`No such item with id: ${id}`, HttpStatus.FORBIDDEN);

    const { name, phone, address, email, cartLines, totalCost, kindOfPayment, shiped } = body;

    const updatedOrderBody = {
      name,
      phone,
      address,
      email,
      total_cost: totalCost,
      kind_of_payment: kindOfPayment,
      cart_lines: cartLines,
      shiped,
    };

    return await this.orderRepository.update({ id }, updatedOrderBody).then(() => this.findById(id));
  }

  async deleteById(id: number) {
    const deletedItem = await this.findById(id);

    if (deletedItem === null) {
      throw new HttpException(`Sorry this item doesn't even exists`, HttpStatus.CONFLICT);
    }

    return await this.orderRepository.delete(id).then(() => `successfully delete by id: ${id}`);
  }
}
