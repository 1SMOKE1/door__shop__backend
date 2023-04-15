import { Module } from '@nestjs/common';
import { WindowService } from './services/window.service';
import { WindowController } from './controllers/window.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowEntity } from './window.entity';
import { ProductProducersModule } from 'src/modules/product-producers/product-producers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowEntity]),
    ProductProducersModule
  ],
  providers: [WindowService],
  controllers: [WindowController],
  exports: [
    TypeOrmModule.forFeature([WindowEntity])
  ]
})
export class WindowModule {}
