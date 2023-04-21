import { Module } from '@nestjs/common';
import { WindowConstructionService } from './services/window-construction.service';
import { WindowConstructionController } from './controllers/window-construction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowConstructionEntity } from './window-construction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowConstructionEntity])
  ],
  providers: [WindowConstructionService],
  controllers: [WindowConstructionController],
  exports: [
    TypeOrmModule.forFeature([WindowConstructionEntity])
  ]
})
export class WindowConstructionModule {}
