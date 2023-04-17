import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { InteriorDoorService } from "../services/interior-door.service";
import { Response } from "express";
import { CreateInteriorDoorDto } from "../dto/create-interior-door.dto";
import { UpdateInteriorDoorDto } from "../dto/update-interior-door.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, imageStorage } from "src/multer-config/multer.config";
import { IImageFiles } from "src/interfaces/IImageFile";

@Controller("interior-door")
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
export class InteriorDoorController {
  constructor(private readonly interiorDoorService: InteriorDoorService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const interiorDoors = await this.interiorDoorService.findAll();
      return res.status(HttpStatus.OK).json(interiorDoors);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const interiorDoor = await this.interiorDoorService.findById(id);
      return res.status(HttpStatus.OK).json(interiorDoor);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateInteriorDoorDto, @UploadedFiles() files: IImageFiles, @Res() res: Response) {
    try {
      const newInteriorDoor = await this.interiorDoorService.createOne(body, files);
      return res.status(HttpStatus.CREATED).json(newInteriorDoor);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @Put(":id")
  async updateById(@Param("id", ParseIntPipe) id: number, @UploadedFiles() files: IImageFiles, @Body() body: UpdateInteriorDoorDto, @Res() res: Response) {
    try {
      const updatedInteriorDoor = await this.interiorDoorService.updateById(id, body, files);
      return res.status(HttpStatus.CREATED).json(updatedInteriorDoor);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      await this.interiorDoorService.deleteById(id);
      return res.status(HttpStatus.OK).json(`interior_door by id: ${id} was deleted successfuly`);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
