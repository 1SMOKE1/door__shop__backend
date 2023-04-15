import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { EntranceDoorService } from '../services/entrance-door.service';
import { Response } from 'express';
import { CreateEntranceDoorDto } from '../dto/create-entrance-door.dto';
import { UpdateEntranceDoorDto } from '../dto/update-entrance-door.dto';


@Controller('entrance-door')
export class EntranceDoorController {

  constructor(
    private readonly entranceDoorService: EntranceDoorService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
  ){
    try {
      const entranceDoors = await this.entranceDoorService.findAll();
      return res.status(HttpStatus.OK).json(entranceDoors);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try{
      const entranceDoor = await this.entranceDoorService.findById(id);
      return res.status(HttpStatus.OK).json(entranceDoor);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateEntranceDoorDto,
    @Res() res: Response
  ){
    try {
      const newEntranceDoor = await this.entranceDoorService.createOne(body);
      return res.status(HttpStatus.CREATED).json(newEntranceDoor);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEntranceDoorDto,
    @Res() res: Response
  ){
    try {
      const newEntranceDoor = await this.entranceDoorService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(newEntranceDoor);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try {
      await this.entranceDoorService.deleteById(id);
      return res.status(HttpStatus.OK).json(`entrance_door by id: ${id} was deleted successfuly`)
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

}
