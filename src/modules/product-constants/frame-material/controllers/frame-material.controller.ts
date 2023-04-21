import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { FrameMaterialService } from '../services/frame-material.service';
import { Response } from 'express';
import { CreateFrameMaterialDto } from '../dto/create-frame-material.dto';
import { UpdateFrameMaterialDto } from '../dto/update-frame-material.dto';

@Controller('frame-material')
export class FrameMaterialController {

  constructor(
    private readonly frameMaterialService: FrameMaterialService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.frameMaterialService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateFrameMaterialDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.frameMaterialService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFrameMaterialDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.frameMaterialService.updateById(id, body);
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
      const deletedItem = await this.frameMaterialService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
