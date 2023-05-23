import { Module } from '@nestjs/common';
import { FurnitureController } from './controllers/furniture.controller';
import { FurnitureService } from './services/furniture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FurnitureEntity } from './furniture.entity';
import { ProductProducersModule } from 'src/modules/product-producers/product-producers.module';
import { TypeOfProductsModule } from 'src/modules/type-of-products/type-of-products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FurnitureEntity]),
    ProductProducersModule,
    TypeOfProductsModule,
    
  
  
  ],
  controllers: [FurnitureController],
  providers: [FurnitureService],
  exports: [
    TypeOrmModule.forFeature([FurnitureEntity])
  ]
})
export class FurnitureModule {}
