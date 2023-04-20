import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OurCommentsService } from '../services/our-comments.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, ourCommentStorage } from 'src/multer-config/multer.config';
import { CreateOurCommentDto } from '../dto/create-our-comment.dto';

@Controller('our-comments')
@UseInterceptors(
  FileInterceptor("image", {
    storage: ourCommentStorage,
    fileFilter: imageFileFilter,
  }),
)
export class OurCommentsController {

  constructor(
    private readonly ourCommentsService: OurCommentsService
  ){}

  @Get()
  async getAll(@Res() res: Response){
    try{
      const ourComments = await this.ourCommentsService.findAll();
      return res.status(HttpStatus.OK).json(ourComments);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post()
  async createOne(@Body() body: CreateOurCommentDto, @Res() res: Response, @UploadedFile() image: Express.Multer.File[]){
    try {
      const newOurComment = await this.ourCommentsService.createOne(body, image);
      return res.status(HttpStatus.CREATED).json(newOurComment);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() body: CreateOurCommentDto, @Res() res: Response, @UploadedFile() image: Express.Multer.File[]){
    try {
      const updatedOurComment = await this.ourCommentsService.updateById(id, body, image);
      return res.status(HttpStatus.CREATED).json(updatedOurComment);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response){
    try{
      const deletedItem = await this.ourCommentsService.deleteById(id);
      return res.status(HttpStatus.OK).json(deletedItem);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

}
