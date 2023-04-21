import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { OpeningMethodService } from '../services/opening-method.service';
import { Response } from 'express';
import { CreateOpeningMethodDto } from '../dto/create-opening-method.dto';
import { UpdateOpeningMethodDto } from '../dto/update-opening-method.dto';

@Controller('opening-method')
export class OpeningMethodController {

  constructor(
    private readonly openingMethodService: OpeningMethodService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.openingMethodService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateOpeningMethodDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.openingMethodService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateOpeningMethodDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.openingMethodService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try {
      const deletedItem = await this.openingMethodService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

}
