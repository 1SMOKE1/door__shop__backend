import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { WindowGlassUnitService } from '../services/window-glass-unit.service';
import { Response } from 'express';
import { CreateWindowGlassUnitDto } from '../dto/create-window-glass-unit.dto';
import { UpdateWindowGlassUnitDto } from '../dto/update-window-glass-unit.dto';

@Controller('window-glass-unit')
export class WindowGlassUnitController {

  constructor(
    private readonly windowGlassUnitService: WindowGlassUnitService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.windowGlassUnitService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateWindowGlassUnitDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.windowGlassUnitService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateWindowGlassUnitDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.windowGlassUnitService.updateById(id, body);
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
      const deletedItem = await this.windowGlassUnitService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

}
