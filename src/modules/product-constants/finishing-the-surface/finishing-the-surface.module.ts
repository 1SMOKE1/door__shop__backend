import { Module } from '@nestjs/common';
import { FinishingTheSurfaceController } from './controllers/finishing-the-surface.controller';
import { FinishingTheSurfaceService } from './services/finishing-the-surface.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishingTheSurfaceEntity } from './finishing-the-surface.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinishingTheSurfaceEntity])
  ],
  controllers: [FinishingTheSurfaceController],
  providers: [FinishingTheSurfaceService],
  exports: [
    TypeOrmModule.forFeature([FinishingTheSurfaceEntity])
  ]
})
export class FinishingTheSurfaceModule {}
