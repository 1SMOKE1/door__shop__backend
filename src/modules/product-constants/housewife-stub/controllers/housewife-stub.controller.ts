import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { HousewifeStubService } from '../services/housewife-stub.service';
import { CreateHousewifeStubDto } from '../dto/create-housewife-stub.dto';
import { UpdateHousewifeStubDto } from '../dto/update-housewife-stub.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/authorization/auth/guards/jwt.auth.guard';

@Controller('housewife-stub')
export class HousewifeStubController {

  constructor(
    private readonly housewifeStubService: HousewifeStubService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.housewifeStubService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateHousewifeStubDto, @Res() res: Response) {
    try {
      const entity = await this.housewifeStubService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateHousewifeStubDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.housewifeStubService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.housewifeStubService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
