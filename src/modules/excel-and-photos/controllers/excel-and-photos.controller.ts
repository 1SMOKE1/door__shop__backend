import { BadRequestException, Controller, HttpStatus, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ExcelAndPhotosService } from '../services/excel-and-photos.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { excelStorage, excelFileFilter, imageStorage, imageFileFilter } from 'src/configurations/multer-config/multer.config';
import { Response } from 'express';
import { IImages } from 'src/interfaces/IImages';

@Controller('excel-and-photos')
@UseInterceptors(
  FileInterceptor("excel", {
    storage: excelStorage,
    fileFilter: excelFileFilter
  }),
  FilesInterceptor("images", 100,{
    storage: imageStorage,
    fileFilter: imageFileFilter
  })
)
export class ExcelAndPhotosController {

  constructor(
    private readonly excelAndPhotosService: ExcelAndPhotosService
  ){}

  @Post()
  async newExcelAndPhotos(
    @Res() res: Response,
    @UploadedFile() excel: Express.Multer.File,
    @UploadedFiles() images: IImages,
  ){
    try {
      const excelData = await this.excelAndPhotosService.readExcelAndPhotos(excel);
      return res.status(HttpStatus.CREATED).json(excelData);
    } catch (err){  
      throw new BadRequestException(err);
    }
  }

}


