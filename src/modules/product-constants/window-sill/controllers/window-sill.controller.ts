import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { WindowSillService } from '../services/window-sill.service';
import { CreateWindowSillDto } from '../dto/create-window-sill.dto';
import { UpdateWindowSillDto } from '../dto/update-window-sill.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('window-sill')
export class WindowSillController {

  constructor(
    private readonly windowSillService: WindowSillService
  ){}


  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.windowSillService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateWindowSillDto, @Res() res: Response) {
    try {
      const entity = await this.windowSillService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateWindowSillDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.windowSillService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.windowSillService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
