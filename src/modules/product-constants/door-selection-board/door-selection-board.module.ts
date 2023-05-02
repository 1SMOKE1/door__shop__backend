import { Module } from '@nestjs/common';
import { DoorSelectionBoardService } from './services/door-selection-board.service';
import { DoorSelectionBoardController } from './controllers/door-selection-board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorSelectionBoardEntity } from './door-selection-board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoorSelectionBoardEntity])
  ],
  providers: [DoorSelectionBoardService],
  controllers: [DoorSelectionBoardController],
  exports: [
    TypeOrmModule.forFeature([DoorSelectionBoardEntity])
  ]
})
export class DoorSelectionBoardModule {}
