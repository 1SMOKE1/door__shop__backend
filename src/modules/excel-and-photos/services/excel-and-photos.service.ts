import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as Excel from 'exceljs';
import * as fs from 'fs';

@Injectable()
export class ExcelAndPhotosService {

  async readExcelAndPhotos(excel: Express.Multer.File, images: Array<Express.Multer.File>){

    return new Promise((res, rej) => {
      const workBook = new Excel.Workbook();
      
      workBook.xlsx.readFile(`./uploads/images/${excel.filename}`)
      .then(() => {
        const sheet = workBook.getWorksheet('interior_door');

        switch(true){
          case !sheet:  
            throw new HttpException('Incorrect sheet name', HttpStatus.CONFLICT);
          case sheet.getRow(1).getCell(1).value !== 'name':
            throw this.createHeaderException('1A', 'name');
          case sheet.getRow(1).getCell(2).value !== 'country':
            throw this.createHeaderException('1B', 'country');
          case sheet.getRow(1).getCell(3).value !== 'productProducerName':
            throw this.createHeaderException('1C', 'productProducerName');
          case sheet.getRow(1).getCell(4).value !== 'guarantee':
            throw this.createHeaderException('1D', 'guarantee');
          case sheet.getRow(1).getCell(5).value !== 'price':
            throw this.createHeaderException('1E', 'price');
          case sheet.getRow(1).getCell(6).value !== 'inStock':
            throw this.createHeaderException('1F', 'inStock');
          case sheet.getRow(1).getCell(7).value !== 'fabricMaterialThickness':
            throw this.createHeaderException('1G', 'fabricMaterialThickness');
          case sheet.getRow(1).getCell(8).value !== 'fabricMaterialHeight':
            throw this.createHeaderException('1H', 'fabricMaterialHeight');
          case sheet.getRow(1).getCell(9).value !== 'fabricMaterialWidth':
            throw this.createHeaderException('1I', 'fabricMaterialWidth');
          case sheet.getRow(1).getCell(10).value !== 'doorIsolation':
            throw this.createHeaderException('1J', 'doorIsolation');
          case sheet.getRow(1).getCell(11).value !== 'doorFrameMaterial':
            throw this.createHeaderException('1K', 'doorFrameMaterial');
          case sheet.getRow(1).getCell(12).value !== 'doorSelectionBoard':
            throw this.createHeaderException('1L', 'doorSelectionBoard');
          case sheet.getRow(1).getCell(13).value !== 'doorWelt':
            throw this.createHeaderException('1M', 'doorWelt');
          case sheet.getRow(1).getCell(14).value !== 'doorHand':
            throw this.createHeaderException('1N', 'doorHand');
          case sheet.getRow(1).getCell(15).value !== 'doorMechanism':
            throw this.createHeaderException('1O', 'doorMechanism');
          case sheet.getRow(1).getCell(16).value !== 'doorLoops':
            throw this.createHeaderException('1P', 'doorLoops');
          case sheet.getRow(1).getCell(17).value !== 'doorStopper':
            throw this.createHeaderException('1Q', 'doorStopper');
          case sheet.getRow(1).getCell(18).value !== 'doorSlidingSystem':
            throw this.createHeaderException('1R', 'doorSlidingSystem');
        }
        
        for(let r = 2; r <= sheet.actualRowCount; r++){
          for(let c = 1; c <= sheet.actualColumnCount; c++){
            // проверка на обазательные 6 поллей
            if(c < 7 && sheet.getRow(r).getCell(c).value === null){
              throw new HttpException('First 6 columns are required', HttpStatus.CONFLICT)
            }
            
          }
        }
        

        this.deleteExcel(excel)
        res('ok')
      })
      .catch((err) => {
        this.deleteExcel(excel);
        rej(new HttpException(err.message, HttpStatus.CONFLICT));
      })
    })


    
    
  }

  private createHeaderException(fieldExcel: string, field: string): HttpException{
    return new HttpException(`Incorrect header in ${fieldExcel}, must be ${field}`, HttpStatus.CONFLICT);
  }

  private deleteExcel(file: Express.Multer.File){
    return fs.unlink(`./uploads/images/${file.filename}`, (err) => {
      if(err)
       throw new HttpException('File not deleted', HttpStatus.BAD_REQUEST)
    })
  }
 
}
