import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { CamerasCountService } from '../services/cameras-count.service';
import { CreateCamerasCountDto } from '../dto/create-cameras-count.dto';
import { UpdateCamerasCountDto } from '../dto/update-cameras-count.dto';
import { Response } from 'express';

@Controller('cameras-count')
export class CamerasCountController {

  constructor(
    private readonly camerasCountService: CamerasCountService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.camerasCountService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateCamerasCountDto, @Res() res: Response) {
    try {
      const entity = await this.camerasCountService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateCamerasCountDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.camerasCountService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.camerasCountService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
