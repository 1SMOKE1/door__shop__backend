import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { CoveringService } from '../services/covering.service';
import { CreateAmountOfSealingMaterialDto } from '../../amount-of-sealing-materials/dto/create-amount-of-sealing-material.dto';
import { UpdateAmountOfSealingMaterialDto } from '../../amount-of-sealing-materials/dto/update-amount-of-sealing-material.dto';
import { Response } from 'express';

@Controller('covering')
export class CoveringController {

  constructor(
    private readonly coveringService: CoveringService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.coveringService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateAmountOfSealingMaterialDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.coveringService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAmountOfSealingMaterialDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.coveringService.updateById(id, body);
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
      const deletedItem = await this.coveringService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
