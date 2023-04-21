import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { OpeningTypeService } from '../services/opening-type.service';
import { Response } from 'express';
import { CreateOpeningTypeDto } from '../dto/create-opening-type.dto';
import { UpdateOpeningTypeDto } from '../dto/update-opening-type.dto';

@Controller('opening-type')
export class OpeningTypeController {

  constructor(
    private readonly openingTypeService: OpeningTypeService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.openingTypeService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateOpeningTypeDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.openingTypeService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateOpeningTypeDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.openingTypeService.updateById(id, body);
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
      const deletedItem = await this.openingTypeService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
