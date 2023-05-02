import { Module } from '@nestjs/common';
import { FrameMaterialConstructionService } from './services/frame-material-construction.service';
import { FrameMaterialConstructionController } from './controllers/frame-material-construction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrameMaterialConstructionEntity } from './frame-material-construction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FrameMaterialConstructionEntity])
  ],
  providers: [FrameMaterialConstructionService],
  controllers: [FrameMaterialConstructionController],
  exports: [
    TypeOrmModule.forFeature([FrameMaterialConstructionEntity])
  ]
})
export class FrameMaterialConstructionModule {}
