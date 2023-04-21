import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { FinishingTheSurfaceService } from '../services/finishing-the-surface.service';
import { Response } from 'express';
import { CreateFinishingTheSurfaceDto } from '../dto/create-finishing-the-surface.dto';
import { UpdateFinishingTheSurfaceDto } from '../dto/update-finishing-the-surface.dto';

@Controller('finishing-the-surface')
export class FinishingTheSurfaceController {

  constructor(
    private readonly finishingTheSurfaceService: FinishingTheSurfaceService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.finishingTheSurfaceService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateFinishingTheSurfaceDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.finishingTheSurfaceService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFinishingTheSurfaceDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.finishingTheSurfaceService.updateById(id, body);
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
      const deletedItem = await this.finishingTheSurfaceService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
