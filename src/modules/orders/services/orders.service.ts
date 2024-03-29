import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "../order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { MailerService } from "@nestjs-modules/mailer";
import userMessage from "src/utils/emailing/user-message";
import { UpdateOrderDto } from "../dto/update-order.dto";
import ownerMessage from "src/utils/emailing/owner-message";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly mailerService: MailerService,
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

    await Promise.all([
      this.mailerService.sendMail(userMessageSend), 
      this.mailerService.sendMail(ownerMessageSend)
    ])
    // try {
      
    // } catch (err) {
    //   throw new HttpException("Incorrect user email", HttpStatus.CONFLICT);
    // }

    // site owner email
    // try {
      
    // } catch (err) {
    //   throw new HttpException("Incorrect some data for emailing to owner", HttpStatus.CONFLICT);
    // }

    const newOrder = this.orderRepository.create(newOrderBody);
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
