import { BadRequestException, Controller, Get, HttpStatus, Res, ParseIntPipe, Param, Post, Body, Delete, UseInterceptors, UploadedFiles, Patch, UseGuards } from "@nestjs/common";
import { WindowService } from "../services/window.service";
import { Response } from "express";
import { CreateWindowDto } from "../dto/create-window.dto";
import { UpdateWindowDto } from "../dto/update-window.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, imageStorage } from "src/configurations/multer-config/multer.config";
import { IImages } from "src/interfaces/IImages";
import { JwtAuthGuard } from "src/modules/authorization/auth/guards/jwt.auth.guard";

@Controller("window")
@UseInterceptors(
  FileFieldsInterceptor(
    [
      {name: 'images', maxCount: 30}
    ],
    {
      storage: imageStorage,
      fileFilter: imageFileFilter,
    },
  ),
)
export class WindowController {
  constructor(private readonly windowService: WindowService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const windows = await this.windowService.findAll();
      return res.status(HttpStatus.OK).json(windows);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const window = await this.windowService.findById(id);
      return res.status(HttpStatus.OK).json(window);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(@Body() body: CreateWindowDto, @UploadedFiles() images: IImages, @Res() res: Response) {
    try {
      const newWindow = await this.windowService.createOne(body, images);
      return res.status(HttpStatus.CREATED).json(newWindow);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @UploadedFiles() images: IImages, @Body() body: UpdateWindowDto, @Res() res: Response) {
    try {
      const updatedWindow = await this.windowService.updateById(id, body, images);
      return res.status(HttpStatus.CREATED).json(updatedWindow);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const answer = await this.windowService.deleteById(id);
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAll(@Res() res: Response){
    try {
      const answer = await this.windowService.deleteAll();
      return res.status(HttpStatus.OK).json(answer);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
