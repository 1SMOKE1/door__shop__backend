import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { FreeZamirService } from '../free-zamir/services/free-zamir.service';
import { Response } from 'express';
import { CreateFreeZamirDto } from '../free-zamir/dto/create-free-zamir.dto';
import { FreeConsultationService } from '../free-consultation/services/free-consultation.service';
import { CreateFreeConsultationDto } from '../free-consultation/dto/create-free-consultation.dto';

@Controller('forms')
export class FormController {

  constructor(
    private readonly freeZamirService: FreeZamirService,
    private readonly freeConsultationService: FreeConsultationService
  ){}

  @Get('free-zamir')
  async getAllZamirForms(@Res() res: Response){
    try {
      const zamirForms = await this.freeZamirService.findAll();
      return res.status(HttpStatus.OK).json(zamirForms);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get('free-consultation')
  async getAllConsultationForms(@Res() res: Response){
    try {
      const freeConsultationForms = await this.freeConsultationService.findAll();
      return res.status(HttpStatus.OK).json(freeConsultationForms);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post('free-zamir')
  async createOneFreeZamir(@Body() body: CreateFreeZamirDto, @Res() res: Response){
    try {
      const newZamirForm = await this.freeZamirService.createOne(body);
      return res.status(HttpStatus.CREATED).json(newZamirForm);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post('free-consultation')
  async createOneFreeConsultation(@Body() body: CreateFreeConsultationDto, @Res() res: Response){
    try {
      const newZamirForm = await this.freeConsultationService.createOne(body);
      return res.status(HttpStatus.CREATED).json(newZamirForm);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete('free-zamir/:id')
  async deleteOneFreeZamir(@Param('id', ParseIntPipe) id: number, @Res() res: Response ){
    try {
      const answer = await this.freeZamirService.deleteOne(id);
      return res.status(HttpStatus.OK).json(answer)
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete('free-consultation/:id')
  async deleteOneFreeConsultation(@Param('id', ParseIntPipe) id: number, @Res() res: Response ){
    try {
      const answer = await this.freeConsultationService.deleteOne(id);
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete('free-zamir')
  async deleteAllFreeZamir(@Res() res: Response ){
    try {
      const answer = await this.freeZamirService.deleteAll();
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete('free-consultation')
  async deleteAllFreeConsultation(@Res() res: Response ){
    try {
      const answer = await this.freeConsultationService.deleteAll();
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
