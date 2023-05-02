import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { DoorWeightService } from '../services/door-weight.service';
import { CreateDoorWeightDto } from '../dto/create-door-weight.dto';
import { UpdateDoorWeightDto } from '../dto/update-door-weight.dto';
import { Response } from 'express';

@Controller('door-weight')
export class DoorWeightController {

  constructor(
    private readonly doorWeightService: DoorWeightService
  ){}
  
  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.doorWeightService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateDoorWeightDto, @Res() res: Response) {
    try {
      const entity = await this.doorWeightService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDoorWeightDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.doorWeightService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.doorWeightService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
