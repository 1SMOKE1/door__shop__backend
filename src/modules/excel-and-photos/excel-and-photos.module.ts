import { Module } from '@nestjs/common';
import { ExcelAndPhotosController } from './controllers/excel-and-photos.controller';
import { ExcelAndPhotosService } from './services/excel-and-photos.service';

@Module({
  controllers: [ExcelAndPhotosController],
  providers: [ExcelAndPhotosService]
})
export class ExcelAndPhotosModule {}
