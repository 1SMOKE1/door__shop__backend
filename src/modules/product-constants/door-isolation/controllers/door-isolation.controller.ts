import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { DoorIsolationService } from '../services/door-isolation.service';
import { CreateDoorIsolationDto } from '../dto/create-door-isolation.dto';
import { UpdateDoorIsolationDto } from '../dto/update-door-isolation.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('door-isolation')
export class DoorIsolationController {
  constructor(private readonly doorIsolationService: DoorIsolationService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.doorIsolationService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateDoorIsolationDto, @Res() res: Response) {
    try {
      const entity = await this.doorIsolationService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDoorIsolationDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.doorIsolationService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.doorIsolationService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
