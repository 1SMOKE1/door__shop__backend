import { BadRequestException, Controller, HttpStatus, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ExcelAndPhotosService } from '../services/excel-and-photos.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { imageStorage, imageFileFilter, excelStorage, excelFileFilter } from 'src/configurations/multer-config/multer.config';
import { Response, Request } from 'express';
import { IImages } from 'src/interfaces/IImages';

@Controller('excel-and-photos')
@UseInterceptors(
  // FileFieldsInterceptor(
  //   [
  //     { name: "images", maxCount: 30 },
  //   ],
  //   {
  //     storage: imageStorage,
  //     fileFilter: imageFileFilter,
  //   },
  // ),
  FileInterceptor("excel", {
    storage: excelStorage,
    fileFilter: excelFileFilter
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
    // @UploadedFiles() images: IImages,
  ){
    try {
      const excelData = await this.excelAndPhotosService.readExcelAndPhotos(excel);
      return res.status(HttpStatus.CREATED).json(excelData);
    } catch (err){  
      console.log(err);
      throw new BadRequestException(err);
    }
  }

}
