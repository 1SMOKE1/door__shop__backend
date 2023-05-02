import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { FabricMaterialWidthService } from '../services/fabric-material-width.service';
import { CreateFabricMaterialWidthDto } from '../dto/create-fabric-material-width.dto';
import { UpdateFabricMaterialWidthDto } from '../dto/update-fabric-material-width.dto';
import { Response } from 'express'; 

@Controller('fabric-material-width')
export class FabricMaterialWidthController {

  constructor(
    private readonly fabricMaterialWidthService: FabricMaterialWidthService
  ){}

  
  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.fabricMaterialWidthService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateFabricMaterialWidthDto, @Res() res: Response) {
    try {
      const entity = await this.fabricMaterialWidthService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateFabricMaterialWidthDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.fabricMaterialWidthService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.fabricMaterialWidthService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}