import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { GlassPocketAddService } from '../services/glass-pocket-add.service';
import { CreateGlassPocketAddDto } from '../dto/create-glass-pocket-add.dto';
import { UpdateGlassPocketAddDto } from '../dto/update-glass-pocket-add.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('glass-pocket-add')
export class GlassPocketAddController {

  constructor(
    private readonly glassPocketAddService: GlassPocketAddService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.glassPocketAddService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateGlassPocketAddDto, @Res() res: Response) {
    try {
      const entity = await this.glassPocketAddService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateGlassPocketAddDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.glassPocketAddService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.glassPocketAddService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
