import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
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

  @Get(':id')
  async getOneByIdAndTypeOfProduct(
    @Param('id', ParseIntPipe) id: number,
    @Query('typeOfProduct') typeOfProduct: string,
    @Res() res: Response)
  {
    try {
      const product = await this.productsService.findOne(id, typeOfProduct);
      return res.status(HttpStatus.OK).json(product);
    } catch (err) {
      throw new BadRequestException(err);    
    }
  }

  @Post('filtration')
  async filtration(
    @Body() body: IHoleFiltrationBody,
    @Query() query: IPagination,
    @Res() res: Response
  ){
    try {
      const filtered = await this.productsService.filtration(body, query)
      return res.status(HttpStatus.OK).json(filtered);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete()
  async deleteAll(
    @Res() res: Response
  ){
    try {
      const answer = await this.productsService.deleteAll()
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

}


