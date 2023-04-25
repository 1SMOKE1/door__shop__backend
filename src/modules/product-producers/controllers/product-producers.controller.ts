import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { ProductProducersService } from "../services/product-producers.service";
import { CreateProductProducerDto } from "../dto/create-product-producer.dto";
import { UpdateProductProducerDto } from "../dto/update-product-producer.dto";

@Controller("product-producers")
export class ProductProducersController {
  constructor(
    private readonly productProducersService: ProductProducersService,
  ) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const productProducers = await this.productProducersService.findAll();
      return res.status(HttpStatus.OK).json(productProducers);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const productProducer = await this.productProducersService.findById(
        id,
      );
      return res.status(HttpStatus.OK).json(productProducer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateProductProducerDto,
    @Res() res: Response,
  ) {
    try {
      const newProductProducer = await this.productProducersService.createOne(
        body,
      );
      return res.status(HttpStatus.OK).json(newProductProducer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProductProducerDto,
    @Res() res: Response,
  ) {
    try {
      const updatedProductProducer = await this.productProducersService.updateOne(id, body);
      return res.status(HttpStatus.OK).json(updatedProductProducer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedProductProducer = await this.productProducersService.deleteOne(id);
      return res.status(HttpStatus.OK).json(deletedProductProducer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
