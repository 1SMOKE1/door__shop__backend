import { Module } from '@nestjs/common';
import { DoorInsulationService } from './services/door-insulation.service';
import { DoorInsulationController } from './controllers/door-insulation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorInsulationEntity } from './door-insulation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoorInsulationEntity])
  ],
  providers: [DoorInsulationService],
  controllers: [DoorInsulationController],
  exports: [
    TypeOrmModule.forFeature([DoorInsulationEntity])
  ]
})
export class DoorInsulationModule {}
