import { Module } from '@nestjs/common';
import { InteriorDoorService } from './services/interior-door.service';
import { InteriorDoorController } from './controllers/interior-door.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteriorDoorEntity } from './interior-door.entity';
import { ProductProducersModule } from 'src/modules/product-producers/product-producers.module';
import { TypeOfProductsModule } from 'src/modules/type-of-products/type-of-products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InteriorDoorEntity]),
    ProductProducersModule,
    TypeOfProductsModule
  ],
  providers: [InteriorDoorService],
  controllers: [InteriorDoorController],
  exports: [
    TypeOrmModule.forFeature([InteriorDoorEntity])
  ]
})
export class InteriorDoorModule {}
