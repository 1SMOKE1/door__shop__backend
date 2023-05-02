import { Module } from '@nestjs/common';
import { WindowHandService } from './services/window-hand.service';
import { WindowHandController } from './controllers/window-hand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowHandEntity } from './window-hand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowHandEntity])
  ],
  providers: [WindowHandService],
  controllers: [WindowHandController],
  exports: [
    TypeOrmModule.forFeature([WindowHandEntity])
  ]
})
export class WindowHandModule {}
