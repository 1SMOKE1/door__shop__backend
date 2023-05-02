import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as Excel from 'exceljs';

@Injectable()
export class ExcelAndPhotosService {

  async readExcelAndPhotos(excel: Express.Multer.File){
    return new Promise((res, rej) => {
      const workBook = new Excel.Workbook();
      workBook.xlsx.readFile(`./uploads/excel/${excel.originalname}`)
      .then(() => {
        const sheet = workBook.getWorksheet('sirst');
        if(!sheet)
        throw new HttpException('Incorrect sheet name', HttpStatus.CONFLICT);
        const cellValue = sheet.getRow(1).getCell(1).value;
        res(cellValue);
      })
      .catch((err) => rej(err));
    })
    
    
  }

 
}
