import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Response } from 'express';
import { IHoleFiltrationBody } from '../interfaces/IHoleFiltrationBody';
import { IPagination } from '../interfaces/IPagination';

@Controller('products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
  ){
    try {
      const products = await this.productsService.findAll();
      return res.status(HttpStatus.OK).json(products);
    } catch (err) {
      throw new BadRequestException(err);
    } 
  }

  @Post('filtration')
  async filtation(
    @Body() body: IHoleFiltrationBody,
    @Query() query: IPagination,
    @Res() res: Response
  ){
    try {
      const filtered = await this.productsService.filtration(body, query)
      return res.status(HttpStatus.OK).json(filtered);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

}


