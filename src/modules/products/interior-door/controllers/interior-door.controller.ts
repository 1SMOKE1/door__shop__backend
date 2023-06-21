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
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { InteriorDoorService } from "../services/interior-door.service";
import { Response } from "express";
import { CreateInteriorDoorDto } from "../dto/create-interior-door.dto";
import { UpdateInteriorDoorDto } from "../dto/update-interior-door.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, imageStorage } from "src/configurations/multer-config/multer.config";
import { IImages } from "src/interfaces/IImages";
import { JwtAuthGuard } from "src/modules/authorization/auth/guards/jwt.auth.guard";

@Controller("interior-door")
@UseInterceptors(
  FileFieldsInterceptor([{ name: "images", maxCount: 30 }], {
    storage: imageStorage,
    fileFilter: imageFileFilter,
  }),
)
export class InteriorDoorController {
  constructor(private readonly interiorDoorService: InteriorDoorService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const interiorDoors = await this.interiorDoorService.findAll();
      return res.status(HttpStatus.OK).json(interiorDoors);
    } catch (err) {
      console.log(err)
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateInteriorDoorDto, @UploadedFiles() images: IImages, @Res() res: Response) {
    try {
      const newInteriorDoor = await this.interiorDoorService.createOne(body, images);
      return res.status(HttpStatus.CREATED).json(newInteriorDoor);
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateById(@Param("id", ParseIntPipe) id: number, @UploadedFiles() images: IImages, @Body() body: UpdateInteriorDoorDto, @Res() res: Response) {
    try {
      const updatedInteriorDoor = await this.interiorDoorService.updateById(id, body, images);
      return res.status(HttpStatus.CREATED).json(updatedInteriorDoor);
    } catch (err) {
      console.log(err);
      throw new BadGatewayException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const answer = await this.interiorDoorService.deleteById(id);
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAll(@Res() res: Response) {
    try {
      const answer = await this.interiorDoorService.deleteAll();
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
