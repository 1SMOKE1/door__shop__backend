import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { WindowEbbService } from '../services/window-ebb.service';
import { CreateWindowEbbDto } from '../dto/create-window-ebb.dto';
import { UpdateWindowEbbDto } from '../dto/update-window-ebb.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('window-ebb')
export class WindowEbbController {

  constructor(
    private readonly windowEbbServices: WindowEbbService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.windowEbbServices.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateWindowEbbDto, @Res() res: Response) {
    try {
      const entity = await this.windowEbbServices.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateWindowEbbDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.windowEbbServices.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.windowEbbServices.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
