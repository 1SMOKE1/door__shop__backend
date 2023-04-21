import { Module } from '@nestjs/common';
import { WindowLaminationService } from './services/window-lamination.service';
import { WindowLaminationController } from './controllers/window-lamination.controller';

@Module({
  providers: [WindowLaminationService],
  controllers: [WindowLaminationController]
})
export class WindowLaminationModule {}
