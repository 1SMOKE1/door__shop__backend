import { Module } from '@nestjs/common';
import { FrameMaterialController } from './controllers/frame-material.controller';
import { FrameMaterialService } from './services/frame-material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrameMaterialEntity } from './frame-material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FrameMaterialEntity])
  ],
  controllers: [FrameMaterialController],
  providers: [FrameMaterialService],
  exports: [
    TypeOrmModule.forFeature([FrameMaterialEntity])
  ]
})
export class FrameMaterialModule {}
