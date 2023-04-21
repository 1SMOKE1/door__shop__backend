import { Module } from '@nestjs/common';
import { FrameMaterialController } from './controllers/frame-material.controller';
import { FrameMaterialService } from './services/frame-material.service';

@Module({
  controllers: [FrameMaterialController],
  providers: [FrameMaterialService]
})
export class FrameMaterialModule {}
