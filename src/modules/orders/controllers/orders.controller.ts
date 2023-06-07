import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { Response } from 'express';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('orders')
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService
  ){}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @Res() res: Response
  ){
    try {
      const orders = await this.ordersService.findAll();
      return res.status(HttpStatus.OK).json(orders);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try {
      const order = await this.ordersService.findById(id);
      return res.status(HttpStatus.OK).json(order);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async crateOne(
    @Body() body: CreateOrderDto,
    @Res() res: Response
  ){
    try {
      const newOrder = await this.ordersService.createOne(body);
      return res.status(HttpStatus.CREATED).json(newOrder);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number, 
    @Body() body: UpdateOrderDto,
    @Res() res: Response
  ){
    try {
      const updatedOrder = await this.ordersService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedOrder);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try {
      const deletedOrder = await this.ordersService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedOrder)
    } catch (err) {
      throw new BadRequestException(err);
    }
  }



}
