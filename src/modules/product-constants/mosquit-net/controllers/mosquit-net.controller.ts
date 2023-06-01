import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { MosquitNetService } from '../services/mosquit-net.service';
import { CreateMosquitNetDto } from '../dto/create-mosquit-net.dto';
import { UpdateMosquitNetDto } from '../dto/update-mosquit-net.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('mosquit-net')
export class MosquitNetController {

  constructor(
    private readonly mosquitNetService: MosquitNetService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.mosquitNetService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateMosquitNetDto, @Res() res: Response) {
    try {
      const entity = await this.mosquitNetService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateMosquitNetDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.mosquitNetService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.mosquitNetService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
