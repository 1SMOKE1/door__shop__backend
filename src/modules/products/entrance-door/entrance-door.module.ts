import { Module } from '@nestjs/common';
import { EntranceDoorService } from './services/entrance-door.service';
import { EntranceDoorController } from './controllers/entrance-door.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntranceDoorEntity } from './entrance-door.entity';
import { ProductProducersModule } from 'src/modules/product-producers/product-producers.module';
import { TypeOfProductsModule } from 'src/modules/type-of-products/type-of-products.module';
import { AmountOfSealingMaterialsModule } from 'src/modules/product-constants/amount-of-sealing-materials/amount-of-sealing-materials.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntranceDoorEntity]),
    ProductProducersModule,
    TypeOfProductsModule,
    AmountOfSealingMaterialsModule
  ],
  providers: [EntranceDoorService],
  controllers: [EntranceDoorController],
  exports: [
    TypeOrmModule.forFeature([EntranceDoorEntity])
  ],
})
export class EntranceDoorModule {}
