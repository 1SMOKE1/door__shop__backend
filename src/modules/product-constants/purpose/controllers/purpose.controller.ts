import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { PurposeService } from '../services/purpose.service';
import { Response } from 'express';
import { UpdatePurposeDto } from '../dto/update-purpose.dto';
import { CreatePurposeDto } from '../dto/create-purpose.dto';

@Controller('purpose')
export class PurposeController {

  constructor(
    private readonly purposeService: PurposeService
  ){}

  
  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.purposeService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreatePurposeDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.purposeService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePurposeDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.purposeService.updateById(id, body);
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
      const deletedItem = await this.purposeService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}