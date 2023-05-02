import { Module } from '@nestjs/common';
import { CamerasCountService } from './services/cameras-count.service';
import { CamerasCountController } from './controllers/cameras-count.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamerasCountEntity } from './cameras-count.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CamerasCountEntity])
  ],
  providers: [CamerasCountService],
  controllers: [CamerasCountController],
  exports: [
    TypeOrmModule.forFeature([CamerasCountEntity])
  ]
})
export class CamerasCountModule {}
