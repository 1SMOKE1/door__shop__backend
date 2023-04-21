import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { InstallationTypeService } from '../services/installation-type.service';
import { Response } from 'express';
import { CreateInstallationTypeDto } from '../dto/create-installation-type.dto';
import { UpdateInstallationTypeDto } from '../dto/update-installation-type.dto';
 
@Controller('installation-type')
export class InstallationTypeController {

  constructor(
    private readonly installationTypeService: InstallationTypeService
  ){}
  
  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.installationTypeService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateInstallationTypeDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.installationTypeService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateInstallationTypeDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.installationTypeService.updateById(id, body);
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
      const deletedItem = await this.installationTypeService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

}
