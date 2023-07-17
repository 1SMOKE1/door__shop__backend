import { BadRequestException, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Headers, Query, Res } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Response } from 'express';
import { IHoleFiltrationBody } from '../interfaces/IHoleFiltrationBody';
import { IPagination } from '../interfaces/IPagination';
import { FileService } from '../services/file.service';
import {join} from 'path';
import * as fs from 'fs';

@Controller('products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,
    private readonly filesService: FileService
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

  @Get('all-and-pagination')
  async getAllAndPagination(
    @Query() query: IPagination,
    @Res() res: Response
  ){
    try {
      const products = await this.productsService.findAllAndPagination(query);
      return res.status(HttpStatus.OK).json(products);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }


  @Get('filtration')
  async filtration(
    @Query() query: IPagination,
    @Res() res: Response,
    @Headers('data') body: string
  ){
    try {
      const parsedBody: IHoleFiltrationBody = JSON.parse(decodeURIComponent(body));
      const filtered = await this.productsService.filtration(parsedBody, query)
      return res.status(HttpStatus.OK).json(filtered);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get('files')
  async getFiles(
    @Query('image') query: string,
    @Res() res: Response
  ){
    try{
      const path = decodeURIComponent(JSON.parse(query));
      console.log(path, 'query path');
      let name: string;
      const env = process.env.NODE

      if(env === 'production'){
        name = path.split('/')[path.split('/').length - 1];
      } else {
        name = path.split('\\')[path.split('\\').length - 1];
      }
      
      console.log(process.cwd(), 'process.cwd');
      console.log(typeof path, 'typeof path');
      // const file = fs.createReadStream(join(`${process.cwd()}/uploads/images`, env === 'production' ? path.split('/')[path.split('/').length - 1] : path.split('\\')[2]));
      const filePath = join(`${process.cwd()}/uploads/images`, name);
      console.log(filePath, 'filepath')
      const file = fs.createReadStream(filePath);

      
      console.log(file, 'file')
      // res.setHeader('Content-Type', 'application/octet-stream');
      // res.setHeader('Content-Disposition', `attachment; filename="${path.split('-')[2]}"`)
      res.type('application/octet-stream');
      file.pipe(res);
    } catch (err) {
      console.log(err)
      throw new BadRequestException(err)
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


