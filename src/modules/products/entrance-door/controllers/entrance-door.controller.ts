import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { EntranceDoorService } from "../services/entrance-door.service";
import { Response } from "express";
import { CreateEntranceDoorDto } from "../dto/create-entrance-door.dto";
import { UpdateEntranceDoorDto } from "../dto/update-entrance-door.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, imageStorage } from "src/configurations/multer-config/multer.config";
import { JwtAuthGuard } from "src/modules/authorization/auth/guards/jwt.auth.guard";
import { IImages } from "src/interfaces/IImages";

@Controller("entrance-door")
@UseGuards(JwtAuthGuard)
@UseInterceptors(
  FileFieldsInterceptor([{ name: "images", maxCount: 30 }], {
    storage: imageStorage,
    fileFilter: imageFileFilter,
  }),
)
export class EntranceDoorController {
  constructor(private readonly entranceDoorService: EntranceDoorService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const entranceDoors = await this.entranceDoorService.findAll();
      return res.status(HttpStatus.OK).json(entranceDoors);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const entranceDoor = await this.entranceDoorService.findById(id);
      return res.status(HttpStatus.OK).json(entranceDoor);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateEntranceDoorDto, @UploadedFiles() images: IImages, @Res() res: Response) {
    try {
      const newEntranceDoor = await this.entranceDoorService.createOne(body, images);
      return res.status(HttpStatus.CREATED).json(newEntranceDoor);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateById(@Param("id", ParseIntPipe) id: number, req: Request, @Body() body: UpdateEntranceDoorDto, @Res() res: Response) {
    try {
      console.log(req)
      const newEntranceDoor = await this.entranceDoorService.updateById(id, body, req.formData['images']);
      return res.status(HttpStatus.CREATED).json(newEntranceDoor);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const answer = await this.entranceDoorService.deleteById(id);
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAll(@Res() res: Response) {
    try {
      const answer = await this.entranceDoorService.deleteAll();
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
