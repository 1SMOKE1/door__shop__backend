import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { DoorWeltService } from '../services/door-welt.service';
import { CreateDoorWeltDto } from '../dto/create-door-welt.dto';
import { UpdateDoorWeltDto } from '../dto/update-door-welt.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';
 
@Controller('door-welt')
export class DoorWeltController {

  constructor(
    private readonly doorWeltService: DoorWeltService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.doorWeltService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateDoorWeltDto, @Res() res: Response) {
    try {
      const entity = await this.doorWeltService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDoorWeltDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.doorWeltService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.doorWeltService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

 
}
