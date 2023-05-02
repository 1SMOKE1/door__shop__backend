import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { SealerCircuitService } from '../services/sealer-circuit.service';
import { CreateSealerCircuitDto } from '../dto/create-sealer-circuit.dto';
import { UpdateSealerCircuitDto } from '../dto/update-sealer-circuit.dto';
import { Response } from 'express';

@Controller('sealer-circuit')
export class SealerCircuitController {

  constructor(
    private readonly sealerCircuitService: SealerCircuitService
  ){}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entities = await this.sealerCircuitService.findAll();
      return res.status(HttpStatus.OK).json(entities);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateSealerCircuitDto, @Res() res: Response) {
    try {
      const entity = await this.sealerCircuitService.createOne(body);
      return res.status(HttpStatus.CREATED).json(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateSealerCircuitDto, @Res() res: Response) {
    try {
      const updatedEntity = await this.sealerCircuitService.updateById(id, body);
      return res.status(HttpStatus.CREATED).json(updatedEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deletedItem = await this.sealerCircuitService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
