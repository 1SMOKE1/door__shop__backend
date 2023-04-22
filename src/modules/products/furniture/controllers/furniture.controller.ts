import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FurnitureService } from "../services/furniture.service";
import { Response } from "express";
import { CreateFurnitureDto } from "../dto/create-furniture.dto";
import { UpdateFurnitureDto } from "../dto/update-furniture.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, imageStorage } from "src/configurations/multer-config/multer.config";
import { IImages } from "src/interfaces/IImages";

@Controller("furniture")
@UseInterceptors(
  FileFieldsInterceptor(
    [
      {name: 'images', maxCount: 30},
    ],
    {
      storage: imageStorage,
      fileFilter: imageFileFilter,
    },
  ),
)
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const furnitures = await this.furnitureService.findAll();
      return res.status(HttpStatus.OK).json(furnitures);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const furniture = await this.furnitureService.findById(id);
      return res.status(HttpStatus.OK).json(furniture);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateFurnitureDto, @UploadedFiles() images: IImages, @Res() res: Response) {
    try {
      const newFurniture = await this.furnitureService.createOne(body, images);
      return res.status(HttpStatus.CREATED).json(newFurniture);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateById(@Param("id", ParseIntPipe) id: number, @UploadedFiles() images: IImages, @Body() body: UpdateFurnitureDto, @Res() res: Response) {
    try {
      const updatedFurniture = await this.furnitureService.updateById(id, body, images);
      return res.status(HttpStatus.CREATED).json(updatedFurniture);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      await this.furnitureService.deleteById(id);
      return res.status(HttpStatus.OK).json(`furniture by id: ${id} was deleted successfuly`);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
