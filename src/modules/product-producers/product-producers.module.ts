import { Module } from '@nestjs/common';
import { ProductProducersController } from './controllers/product-producers.controller';
import { ProductProducersService } from './services/product-producers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProducerEntity } from './product-producer.entity';
import { TypeOfProductsModule } from '../type-of-products/type-of-products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductProducerEntity
    ]),
    TypeOfProductsModule
  ],
  controllers: [ProductProducersController],
  providers: [ProductProducersService],
  exports: [
    TypeOrmModule.forFeature([
      ProductProducerEntity
    ])
    , ProductProducersService]
})
export class ProductProducersModule {}
