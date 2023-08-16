import { BadRequestException, Controller, HttpStatus, Post, Query, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ExcelAndPhotosService } from '../services/excel-and-photos.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { imageStorage, excelWithPhotosFileFilter } from 'src/configurations/multer-config/multer.config';
import { Response } from 'express';
import { EnumExcelMethod } from 'src/enums/excel-metho';

@Controller('excel-and-photos')
export class ExcelAndPhotosController {

  constructor(
    private readonly excelAndPhotosService: ExcelAndPhotosService
  ){}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
        {name: "excel", maxCount: 1},
        {name: 'images', maxCount: 300}
      ],
        {
          storage: imageStorage,
          fileFilter: excelWithPhotosFileFilter
        }
    )
  )
  async createOrUpdateExcelAndPhotos(
    @Res() res: Response,
    @UploadedFiles() files: {excel: Express.Multer.File[], images: Array<Express.Multer.File>},
    @Query('method') method: EnumExcelMethod
  ){
    try {

      const {excel, images} = files;
      const excelData = await this.excelAndPhotosService.readExcelAndPhotos(excel[0], images, method);
      return res.status(HttpStatus.CREATED).json(excelData);
    } catch (err){  
      this.excelAndPhotosService.resetRowCounter();
      throw new BadRequestException(err);
    }
  }


}


