import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { FabricMaterialService } from '../services/fabric-material.service';
import { Response } from 'express';
import { CreateFabricMaterialDto } from '../dto/create-fabric-material.dto';
import { UpdateFabricMaterialDto } from '../dto/update-fabric-material.dto';

@Controller('fabric-material')
export class FabricMaterialController {

  constructor(
    private readonly fabricMaterialService: FabricMaterialService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.fabricMaterialService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateFabricMaterialDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.fabricMaterialService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFabricMaterialDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.fabricMaterialService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try {
      const deletedItem = await this.fabricMaterialService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
