import { Module } from '@nestjs/common';
import { DoorWeltService } from './services/door-welt.service';
import { DoorWeltController } from './controllers/door-welt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorWeltEntity } from './door-welt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoorWeltEntity])
  ],
  providers: [DoorWeltService],
  controllers: [DoorWeltController],
  exports: [
    TypeOrmModule.forFeature([DoorWeltEntity])
  ]
})
export class DoorWeltModule {}
