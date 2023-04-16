import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe, Post, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EntranceDoorService } from '../services/entrance-door.service';
import { Response } from 'express';
import { CreateEntranceDoorDto } from '../dto/create-entrance-door.dto';
import { UpdateEntranceDoorDto } from '../dto/update-entrance-door.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, imageStorage } from 'src/multer-config/multer.config';
import { IImageFiles } from 'src/interfaces/IImageFile';

@Controller('entrance-door')
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'img_main', maxCount: 1 },
    { name: 'img_1', maxCount: 1 },
    { name: 'img_2', maxCount: 1},
    { name: 'img_3', maxCount: 1},
    { name: 'img_4', maxCount: 1},
  ], {
    storage: imageStorage,
    fileFilter: imageFileFilter
  })
)
export class EntranceDoorController {

  constructor(
    private readonly entranceDoorService: EntranceDoorService
  ){}

  @Get()
  async getAll(
    @Res() res: Response
  ){
    try {
      const entranceDoors = await this.entranceDoorService.findAll();
      return res.status(HttpStatus.OK).json(entranceDoors);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ){
    try{
      const entranceDoor = await this.entranceDoorService.findById(id);
      return res.status(HttpStatus.OK).json(entranceDoor);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  
  @Post()
  async createOne(
    @Body() body: CreateEntranceDoorDto,
    @UploadedFiles() files: IImageFiles,
    @Res() res: Response,
  ){
    try {
      const newEntranceDoor = await this.entranceDoorService.createOne(body, files);
      return res.status(HttpStatus.CREATED).json(newEntranceDoor);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: IImageFiles,
    @Body() body: UpdateEntranceDoorDto,
    @Res() res: Response
  ){
    try {
      const newEntranceDoor = await this.entranceDoorService.updateById(id, body, files);
      return res.status(HttpStatus.CREATED).json(newEntranceDoor);
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
      await this.entranceDoorService.deleteById(id);
      return res.status(HttpStatus.OK).json(`entrance_door by id: ${id} was deleted successfuly`)
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

}
