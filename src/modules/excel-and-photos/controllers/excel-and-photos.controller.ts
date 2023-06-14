import { BadRequestException, Controller, HttpStatus, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ExcelAndPhotosService } from '../services/excel-and-photos.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { excelStorage, excelFileFilter, imageStorage, imageFileFilter } from 'src/configurations/multer-config/multer.config';
import { Request, Response } from 'express';
import { IImages } from 'src/interfaces/IImages';

@Controller('excel-and-photos')
export class ExcelAndPhotosController {

  constructor(
    private readonly excelAndPhotosService: ExcelAndPhotosService
  ){}

  @Post()
  @UseInterceptors(
    FileInterceptor("excel", {
      storage: excelStorage,
      fileFilter: excelFileFilter
    })
  )
  async newExcelAndPhotos(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ){
    try {
      // console.log(file);
      console.log(file)
      console.log(req.files);
      console.log(req.file);
      // const excelData = await this.excelAndPhotosService.readExcelAndPhotos(file);
      return res.status(HttpStatus.CREATED).json('ok');
    } catch (err){  
      console.log(err);
      throw new BadRequestException(err);
    }
  }

}


