import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { TypeOfProductsService } from "../services/type-of-products.service";

@Controller("type-of-products")
export class TypeOfProductsController {
  constructor(private readonly typeOfProductsService: TypeOfProductsService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const typeOfProducts = await this.typeOfProductsService.findAll();
      res.status(HttpStatus.OK).json(typeOfProducts);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const typeOfProduct = await this.typeOfProductsService.findById(id);
      res.status(HttpStatus.OK).json(typeOfProduct);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
