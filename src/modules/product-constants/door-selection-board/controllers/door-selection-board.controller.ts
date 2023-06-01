import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { DoorSelectionBoardService } from '../services/door-selection-board.service';
import { CreateDoorSelectionBoardDto } from '../dto/create-door-selection-board.dto';
import { UpdateDoorSelectionBoardDto } from '../dto/update-door-selection-board.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('door-selection-board')
export class DoorSelectionBoardController {

  constructor(
    private readonly doorSelectionBoardService: DoorSelectionBoardService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.doorSelectionBoardService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateDoorSelectionBoardDto, @Res() res: Response) {
    try {
      const entity = await this.doorSelectionBoardService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDoorSelectionBoardDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.doorSelectionBoardService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.doorSelectionBoardService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
