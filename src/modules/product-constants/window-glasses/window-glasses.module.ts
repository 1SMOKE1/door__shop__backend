import { Module } from '@nestjs/common';
import { WindowGlassesService } from './services/window-glasses.service';
import { WindowGlassesController } from './controllers/window-glasses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowGlassEntity } from './window-glasses.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowGlassEntity])
  ],
  providers: [WindowGlassesService],
  controllers: [WindowGlassesController],
  exports: [
    TypeOrmModule.forFeature([WindowGlassEntity])
  ]
})
export class WindowGlassesModule {}
