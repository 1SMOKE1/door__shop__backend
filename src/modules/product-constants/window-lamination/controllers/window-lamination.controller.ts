import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { WindowLaminationService } from '../services/window-lamination.service';
import { Response } from 'express';
import { CreateWindowLaminationDto } from '../dto/create-window-lamination.dto';
import { UpdateWindowLaminationDto } from '../dto/update-window-lamination.dto';

@Controller('window-lamination')
export class WindowLaminationController {

  constructor(
    private readonly windowLaminationService: WindowLaminationService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.windowLaminationService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateWindowLaminationDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.windowLaminationService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateWindowLaminationDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.windowLaminationService.updateById(id, body);
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
      const deletedItem = await this.windowLaminationService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
