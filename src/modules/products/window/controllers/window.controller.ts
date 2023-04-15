import { BadRequestException, Controller, Get, HttpStatus, Res, ParseIntPipe, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { WindowService } from '../services/window.service';
import { Response } from 'express';
import { CreateWindowDto } from '../dto/create-window.dto';
import { UpdateWindowDto } from '../dto/update-window.dto';

@Controller('window')
export class WindowController {

  constructor(
    private readonly windowService: WindowService
  ){}

  @Get()
  async getAll(
    @Res() res: Response    
  ){
    try {
      const windows = await this.windowService.findAll();
      return res.status(HttpStatus.OK).json(windows);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try {
      const window = await this.windowService.findById(id);
      return res.status(HttpStatus.OK).json(window);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateWindowDto,
    @Res() res: Response
  ){
    try {
      const newWindow = await this.windowService.createOne(body);
      return res.status(HttpStatus.CREATED).json(newWindow);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateWindowDto,
    @Res() res: Response
  ){
    try {
      const updatedWindow = await this.windowService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedWindow);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  async deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try {
      await this.windowService.deleteById(id);
      return res.status(HttpStatus.OK).json(`window by id: ${id} was deleted successfuly`)
    } catch (err) {
      throw new BadRequestException(err);
    }
  }


}
