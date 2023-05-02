import { Module } from '@nestjs/common';
import { DoorSlidingSystemService } from './services/door-sliding-system.service';
import { DoorSlidingSystemController } from './controllers/door-sliding-system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorSlidingSystemEntity } from './door-sliding-system.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoorSlidingSystemEntity])
  ],
  providers: [DoorSlidingSystemService],
  controllers: [DoorSlidingSystemController],
  exports: [
    TypeOrmModule.forFeature([DoorSlidingSystemEntity])
  ]
})
export class DoorSlidingSystemModule {}
