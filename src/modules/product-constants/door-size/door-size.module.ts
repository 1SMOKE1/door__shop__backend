import { Module } from '@nestjs/common';
import { DoorSizeController } from './controllers/door-size.controller';
import { DoorSizeService } from './services/door-size.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorSizeEntity } from './door-size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoorSizeEntity])
  ],
  controllers: [DoorSizeController],
  providers: [DoorSizeService],
  exports: [
    TypeOrmModule.forFeature([DoorSizeEntity])
  ]
})
export class DoorSizeModule {}
