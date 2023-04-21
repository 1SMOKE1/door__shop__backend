import { Module } from '@nestjs/common';
import { OpeningMethodController } from './controllers/opening-method.controller';
import { OpeningMethodService } from './services/opening-method.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpeningMethodEntity } from './opening-method.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpeningMethodEntity])
  ],
  controllers: [OpeningMethodController],
  providers: [OpeningMethodService],
  exports: [
    TypeOrmModule.forFeature([OpeningMethodEntity])
  ]
})
export class OpeningMethodModule {}
