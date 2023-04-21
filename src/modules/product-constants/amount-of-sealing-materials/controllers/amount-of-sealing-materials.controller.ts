import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AmountOfSealingMaterialsService } from '../services/amount-of-sealing-materials.service';
import { Response } from 'express';

@Controller('amount-of-sealing-materials')
export class AmountOfSealingMaterialsController {

  constructor(
    private readonly amountOfSealingMaterialsService: AmountOfSealingMaterialsService
  ){}


  @Get()
  async getAll(@Res() res: Response){
    try {
      const amountOfSealingMaterials = await this.amountOfSealingMaterialsService.findAll();
      return  res.status(HttpStatus.OK).json(amountOfSealingMaterials);
    } catch (err) {
      
    }
  }
}
