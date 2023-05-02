import { Module } from '@nestjs/common';
import { WindowSillService } from './services/window-sill.service';
import { WindowSillController } from './controllers/window-sill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowSillEntity } from './window-sill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowSillEntity])
  ],
  providers: [WindowSillService],
  controllers: [WindowSillController],
  exports: [
    TypeOrmModule.forFeature([WindowSillEntity])
  ]
})
export class WindowSillModule {}
