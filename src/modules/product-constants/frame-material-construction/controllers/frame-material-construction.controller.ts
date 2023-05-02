import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { FrameMaterialConstructionService } from '../services/frame-material-construction.service';
import { CreateFrameMaterialConstructionDto } from '../dto/create-frame-material-construction.dto';
import { UpdateFrameMaterialConstructionDto } from '../dto/update-frame-material-construction.dto';
import { Response } from 'express';
@Controller('frame-material-construction')
export class FrameMaterialConstructionController {

  constructor(
    private readonly frameMaterialConstructionService: FrameMaterialConstructionService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.frameMaterialConstructionService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateFrameMaterialConstructionDto, @Res() res: Response) {
    try {
      const entity = await this.frameMaterialConstructionService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateFrameMaterialConstructionDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.frameMaterialConstructionService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.frameMaterialConstructionService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
