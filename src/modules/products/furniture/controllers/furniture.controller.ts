import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FurnitureService } from "../services/furniture.service";
import { Response } from "express";
import { CreateFurnitureDto } from "../dto/create-furniture.dto";
import { UpdateFurnitureDto } from "../dto/update-furniture.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, imageStorage } from "src/multer-config/multer.config";
import { IImageFiles } from "src/interfaces/IImageFile";

@Controller("furniture")
@UseInterceptors(
  FileFieldsInterceptor(
    [
      { name: "img_main", maxCount: 1 },
      { name: "img_1", maxCount: 1 },
      { name: "img_2", maxCount: 1 },
      { name: "img_3", maxCount: 1 },
      { name: "img_4", maxCount: 1 },
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
  async createOne(@Body() body: CreateFurnitureDto, @UploadedFiles() files: IImageFiles, @Res() res: Response) {
    try {
      const newFurniture = await this.furnitureService.createOne(body, files);
      return res.status(HttpStatus.CREATED).json(newFurniture);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateById(@Param("id", ParseIntPipe) id: number, @UploadedFiles() files: IImageFiles, @Body() body: UpdateFurnitureDto, @Res() res: Response) {
    try {
      const updatedFurniture = await this.furnitureService.updateById(id, body, files);
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
