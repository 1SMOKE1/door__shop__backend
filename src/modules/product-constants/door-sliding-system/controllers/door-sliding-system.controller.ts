import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { DoorSlidingSystemService } from '../services/door-sliding-system.service';
import { CreateDoorSlidingSystemDto } from '../dto/create-door-sliding-system.dto';
import { UpdateDoorSlidingSystemDto } from '../dto/update-door-sliding-system.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('door-sliding-system')
export class DoorSlidingSystemController {

  constructor(
    private readonly doorSlidingSystemService: DoorSlidingSystemService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.doorSlidingSystemService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateDoorSlidingSystemDto, @Res() res: Response) {
    try {
      const entity = await this.doorSlidingSystemService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDoorSlidingSystemDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.doorSlidingSystemService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.doorSlidingSystemService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
