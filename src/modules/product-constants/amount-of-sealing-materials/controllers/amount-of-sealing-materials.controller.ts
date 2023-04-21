import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { AmountOfSealingMaterialsService } from '../services/amount-of-sealing-materials.service';
import { Response } from 'express';
import { CreateAmountOfSealingMaterialDto } from '../dto/create-amount-of-sealing-material.dto';
import { UpdateAmountOfSealingMaterialDto } from '../dto/update-amount-of-sealing-material.dto';

@Controller('amount-of-sealing-materials')
export class AmountOfSealingMaterialsController {

  constructor(
    private readonly amountOfSealingMaterialsService: AmountOfSealingMaterialsService
  ){}


  @Get()
  async getAll(
    @Res() res: Response
    ){
    try {
      const amountOfSealingMaterials = await this.amountOfSealingMaterialsService.findAll();
      return  res.status(HttpStatus.OK).json(amountOfSealingMaterials);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(
    @Body() body: CreateAmountOfSealingMaterialDto,
    @Res() res: Response
    ){
    try {
      const newAmountOfSealingMaterial = await this.amountOfSealingMaterialsService.createOne(body);
      return res.status(HttpStatus.CREATED).json(newAmountOfSealingMaterial);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAmountOfSealingMaterialDto,
    @Res() res: Response){
    try {
      const updatedAmountOfSealingMaterial = await this.amountOfSealingMaterialsService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedAmountOfSealingMaterial);
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
      const deletedItem = await this.amountOfSealingMaterialsService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
