import { Module } from '@nestjs/common';
import { EntranceDoorService } from './services/entrance-door.service';
import { EntranceDoorController } from './controllers/entrance-door.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntranceDoorEntity } from './entrance-door.entity';
import { ProductProducersModule } from 'src/modules/product-producers/product-producers.module';
import { TypeOfProductsModule } from 'src/modules/type-of-products/type-of-products.module';
import { ConvertingService } from '../services/converting.service';
import { DoorInsulationModule } from 'src/modules/product-constants/door-insulation/door-insulation.module';
import { DoorCoveringModule } from 'src/modules/product-constants/door-covering/door-covering.module';
import { OpeningTypeModule } from 'src/modules/product-constants/opening-type/opening-type.module';
import { FurnitureModule } from '../furniture/furniture.module';
import { DoorSizeModule } from 'src/modules/product-constants/door-size/door-size.module';
import { DoorWeightModule } from 'src/modules/product-constants/door-weight/door-weight.module';
import { FrameMaterialConstructionModule } from 'src/modules/product-constants/frame-material-construction/frame-material-construction.module';
import { SealerCircuitModule } from 'src/modules/product-constants/sealer-circuit/sealer-circuit.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntranceDoorEntity]),
    ProductProducersModule,
    TypeOfProductsModule,
    DoorInsulationModule,
    DoorCoveringModule,
    OpeningTypeModule,
    DoorSizeModule,
    FurnitureModule,
    DoorWeightModule,
    FrameMaterialConstructionModule,
    SealerCircuitModule,
    CacheModule.register()
  ],
  providers: [EntranceDoorService, ConvertingService],
  controllers: [EntranceDoorController],
  exports: [
    TypeOrmModule.forFeature([EntranceDoorEntity])
  ],
})
export class EntranceDoorModule {}
