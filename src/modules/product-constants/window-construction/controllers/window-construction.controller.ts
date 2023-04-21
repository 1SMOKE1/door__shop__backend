import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { WindowConstructionService } from "../services/window-construction.service";
import { Response } from 'express';
import { CreateWindowConstructionDto } from "../dto/create-window-construction.dto";
import { UpdateWindowConstructionDto } from "../dto/update-window-construction.dto";

@Controller('window-construction')
export class WindowConstructionController {

  constructor(
    private readonly windowConstructionService: WindowConstructionService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const entities = await this.windowConstructionService.findAll();
      return  res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateWindowConstructionDto,
    @Res() res: Response
    ){
    try {
      const entity = await this.windowConstructionService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateWindowConstructionDto,
    @Res() res: Response){
    try {
      const updatedEntity = await this.windowConstructionService.updateById(id, body);
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
      const deletedItem = await this.windowConstructionService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

}
