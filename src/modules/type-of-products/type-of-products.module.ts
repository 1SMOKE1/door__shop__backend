import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfProductEntity } from './type-of-product.entity';
import { TypeOfProductsService } from './services/type-of-products.service';
import { TypeOfProductsController } from './controllers/type-of-products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOfProductEntity
    ])
  ],
  exports: [
    TypeOrmModule.forFeature([
      TypeOfProductEntity
    ])
  ],
  providers: [TypeOfProductsService],
  controllers: [TypeOfProductsController]
})
export class TypeOfProductsModule {}
