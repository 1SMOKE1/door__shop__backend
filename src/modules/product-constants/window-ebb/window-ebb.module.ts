import { Module } from '@nestjs/common';
import { WindowEbbService } from './services/window-ebb.service';
import { WindowEbbController } from './controllers/window-ebb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowEbbEntity } from './window-ebb.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowEbbEntity])
  ],
  providers: [WindowEbbService],
  controllers: [WindowEbbController],
  exports: [
    TypeOrmModule.forFeature([WindowEbbEntity])
  ]
})
export class WindowEbbModule {}
