import { Module } from '@nestjs/common';
import { WindowLaminationService } from './services/window-lamination.service';
import { WindowLaminationController } from './controllers/window-lamination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowLaminationEntity } from './window-lamination.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowLaminationEntity])
  ],
  providers: [WindowLaminationService],
  controllers: [WindowLaminationController],
  exports: [
    TypeOrmModule.forFeature([WindowLaminationEntity])
  ]
})
export class WindowLaminationModule {}
