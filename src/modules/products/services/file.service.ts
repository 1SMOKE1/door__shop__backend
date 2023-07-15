import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

 
@Injectable()
export class FileService {

  getFileBuffer(filePathes: string[]){

    const filesBufferArr: {base64: string, fileName: string, fileType: string}[] = [];



    filePathes.forEach((filePath) => {
      const fileName = filePath.split('-')[2];
      let fileType = fileName.split('.')[1];  

      switch(true){
        case fileType === 'jpg' || fileType === 'jpeg' || fileType === 'jfif' || fileType === 'pjpeg' || fileType === 'pjp':
          fileType = 'image/jpeg';
          break;
        case fileType === 'apng':
          fileType = 'image/apng';
          break;
        case fileType === 'gif':
          fileType = 'image/gif';
          break;
        case fileType === 'avif':
          fileType = 'image/avif';
          break;
        case fileType === 'png':
          fileType = 'image/png';
          break;
        case fileType === 'svg':
          fileType = 'image/svg+xml'
          break;
        case fileType === 'webp':
          fileType = 'image/webp';
          break;
      }

      const fileBuffer = `data:${fileType};base64,${fs.readFileSync(filePath, 'base64')}`;

      
      filesBufferArr.push({base64: fileBuffer, fileName, fileType})
    })

    return filesBufferArr
  }


  
}
