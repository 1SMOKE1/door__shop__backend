import { Module } from '@nestjs/common';
import { WindowGlassesService } from './services/window-glasses.service';
import { WindowGlassesController } from './controllers/window-glasses.controller';

@Module({
  providers: [WindowGlassesService],
  controllers: [WindowGlassesController]
})
export class WindowGlassesModule {}
