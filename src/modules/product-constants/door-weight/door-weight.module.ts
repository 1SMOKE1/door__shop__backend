import { Module } from '@nestjs/common';
import { DoorWeightService } from './services/door-weight.service';
import { DoorWeightController } from './controllers/door-weight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorWeightEntity } from './door-weight.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoorWeightEntity])
  ],
  providers: [DoorWeightService],
  controllers: [DoorWeightController],
  exports: [
    TypeOrmModule.forFeature([DoorWeightEntity])
  ],
})
export class DoorWeightModule {}
