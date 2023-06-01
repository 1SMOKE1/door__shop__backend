import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { DoorInsulationService } from '../services/door-insulation.service';
import { CreateDoorInsulationDto } from '../dto/create-door-insulation.dto';
import { UpdateDoorInsulationDto } from '../dto/update-door-insulation.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('door-insulation')
export class DoorInsulationController {

  constructor(
    private readonly doorInsulationService: DoorInsulationService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.doorInsulationService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateDoorInsulationDto, @Res() res: Response) {
    try {
      const entity = await this.doorInsulationService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDoorInsulationDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.doorInsulationService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.doorInsulationService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
