import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { FeaturesService } from '../services/features.service';
import { CreateFeaturesDto } from '../dto/create-features.dto';
import { UpdateFeaturesDto } from '../dto/update-features.dto';
import { Response } from 'express';

@Controller('features')
export class FeaturesController {

  constructor(
    private readonly featuresService: FeaturesService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.featuresService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateFeaturesDto, @Res() res: Response) {
    try {
      const entity = await this.featuresService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateFeaturesDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.featuresService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.featuresService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
