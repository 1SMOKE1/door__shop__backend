import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { DoorSizeService } from '../services/door-size.service';
import { Response } from 'express';
import { UpdateDoorSizeDto } from '../dto/update-door-size.dto';
import { CreateDoorSizeDto } from '../dto/create-door-size.dto';

@Controller('door-size')
export class DoorSizeController {

  constructor(
    private readonly doorSizeService: DoorSizeService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.doorSizeService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateDoorSizeDto, @Res() res: Response) {
    try {
      const entity = await this.doorSizeService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDoorSizeDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.doorSizeService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.doorSizeService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
