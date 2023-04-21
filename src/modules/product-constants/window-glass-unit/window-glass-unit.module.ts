import { Module } from '@nestjs/common';
import { WindowGlassUnitController } from './controllers/window-glass-unit.controller';
import { WindowGlassUnitService } from './services/window-glass-unit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowGlassUnitEntity } from './window-glass-unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowGlassUnitEntity])
  ],
  controllers: [WindowGlassUnitController],
  providers: [WindowGlassUnitService],
  exports: [
    TypeOrmModule.forFeature([WindowGlassUnitEntity])  
  ]
})
export class WindowGlassUnitModule {}
