import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { WindowGlassesService } from '../services/window-glasses.service';
import { Response } from 'express';
import { CreateWindowGlassesDto } from '../dto/create-window-glasses.dto';
import { UpdateWindowGlassesDto } from '../dto/update-window-glasses.dto';

@Controller('window-glasses')
export class WindowGlassesController {

  constructor(
    private readonly windowGlassesService: WindowGlassesService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.windowGlassesService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateWindowGlassesDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.windowGlassesService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateWindowGlassesDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.windowGlassesService.updateById(id, body);
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
      const deletedItem = await this.windowGlassesService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

}
