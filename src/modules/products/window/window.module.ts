import { Module } from '@nestjs/common';
import { WindowService } from './services/window.service';
import { WindowController } from './controllers/window.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowEntity } from './window.entity';
import { ProductProducersModule } from 'src/modules/product-producers/product-producers.module';
import { TypeOfProductsModule } from 'src/modules/type-of-products/type-of-products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowEntity]),
    ProductProducersModule,
    TypeOfProductsModule
  ],
  providers: [WindowService],
  controllers: [WindowController],
  exports: [
    TypeOrmModule.forFeature([WindowEntity])
  ]
})
export class WindowModule {}
