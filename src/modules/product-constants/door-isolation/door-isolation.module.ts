import { Module } from '@nestjs/common';
import { DoorIsolationService } from './services/door-isolation.service';
import { DoorIsolationController } from './controllers/door-isolation.controller';
import { DoorIsolationEntity } from './door-isolation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoorIsolationEntity]) 
  ],
  providers: [DoorIsolationService],
  controllers: [DoorIsolationController],
  exports: [TypeOrmModule.forFeature([DoorIsolationEntity]) ]
})
export class DoorIsolationModule {}
