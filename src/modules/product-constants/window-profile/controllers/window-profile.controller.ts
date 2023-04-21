import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { WindowProfileService } from '../services/window-profile.service';
import { Response } from 'express'; 
import { CreateWindowProfileDto } from '../dto/create-window-profile.dto';
import { UpdateWindowProfileDto } from '../dto/update-window-profile.dto';

@Controller('window-profile')
export class WindowProfileController {

  constructor(
    private readonly windowProfileService: WindowProfileService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.windowProfileService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateWindowProfileDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.windowProfileService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateWindowProfileDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.windowProfileService.updateById(id, body);
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
      const deletedItem = await this.windowProfileService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

