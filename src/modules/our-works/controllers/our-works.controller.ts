import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, ourWorkStorage } from "src/multer-config/multer.config";
import { OurWorksService } from "../services/our-works.service";
import { Response } from "express";
import { CreateOurWorkDto } from "../dto/create-our-work.dto";
import { UpdateOurWorkDto } from "../dto/update-our-work.dto";

@Controller("our-works")
@UseInterceptors(
  FileInterceptor("image", {
    storage: ourWorkStorage,
    fileFilter: imageFileFilter,
  }),
)
export class OurWorksController {
  constructor(private readonly ourWorksService: OurWorksService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const ourWorks = await this.ourWorksService.findAll();
      return res.status(HttpStatus.OK).json(ourWorks);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@UploadedFile() image: Express.Multer.File[], @Body() body: CreateOurWorkDto, @Res() res: Response) {
    try {
      const newOurWork = await this.ourWorksService.createOne(body, image);
      return res.status(HttpStatus.CREATED).json(newOurWork);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(":id")
  async updateOne(@Param("id", ParseIntPipe) id: number, @UploadedFile() image: Express.Multer.File[], @Body() body: UpdateOurWorkDto, @Res() res: Response) {
    try {
      const updatedOurWork = await this.ourWorksService.updateById(id, body, image);
      return res.status(HttpStatus.CREATED).json(updatedOurWork);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(":id")
  async deleteOne(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deleteOne = await this.ourWorksService.deleteById(id);
      return res.status(HttpStatus.OK).json(deleteOne);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
