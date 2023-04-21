import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { StructuralFeaturesService } from '../services/structural-features.service';
import { Response } from 'express';
import { CreateStructuralFeatureDto } from '../dto/create-structural-feature.dto';
import { UpdateStructuralFeatureDto } from '../dto/update-structural-feature.dto';

@Controller('structural-features')
export class StructuralFeaturesController {

  constructor(
    private readonly structuralFeaturesService: StructuralFeaturesService
  ){}

  
  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.structuralFeaturesService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateStructuralFeatureDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.structuralFeaturesService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStructuralFeatureDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.structuralFeaturesService.updateById(id, body);
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
      const deletedItem = await this.structuralFeaturesService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}