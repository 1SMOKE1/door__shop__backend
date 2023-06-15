import { BadRequestException, Controller, HttpStatus, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ExcelAndPhotosService } from '../services/excel-and-photos.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { imageStorage, excelWithPhotosFileFilter } from 'src/configurations/multer-config/multer.config';
import { Response } from 'express';

@Controller('excel-and-photos')
export class ExcelAndPhotosController {

  constructor(
    private readonly excelAndPhotosService: ExcelAndPhotosService
  ){}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
        {name: "excel", maxCount: 1},
        {name: 'images', maxCount: 100}
      ],
        {
          storage: imageStorage,
          fileFilter: excelWithPhotosFileFilter
        }
    )
  )
  async newExcelAndPhotos(
    @Res() res: Response,
    @UploadedFiles() files: {excel: Express.Multer.File[], images: Array<Express.Multer.File>},
  ){
    try {
      // console.log(file);
      const {excel, images} = files;

      const excelData = await this.excelAndPhotosService.readExcelAndPhotos(excel[0], images);
      return res.status(HttpStatus.CREATED).json(excelData);
    } catch (err){  
      throw new BadRequestException(err);
    }
  }

}


