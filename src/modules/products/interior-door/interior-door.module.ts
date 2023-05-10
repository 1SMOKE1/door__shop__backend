import { Module } from '@nestjs/common';
import { InteriorDoorService } from './services/interior-door.service';
import { InteriorDoorController } from './controllers/interior-door.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteriorDoorEntity } from './interior-door.entity';
import { ProductProducersModule } from 'src/modules/product-producers/product-producers.module';
import { TypeOfProductsModule } from 'src/modules/type-of-products/type-of-products.module';
import { FurnitureModule } from '../furniture/furniture.module';
import { FabricMaterialWidthModule } from 'src/modules/product-constants/fabric-material-width/fabric-material-width.module';
import { DoorIsolationModule } from 'src/modules/product-constants/door-isolation/door-isolation.module';
import { DoorFrameMaterialModule } from 'src/modules/product-constants/door-frame-material/door-frame-material.module';
import { DoorSelectionBoardModule } from 'src/modules/product-constants/door-selection-board/door-selection-board.module';
import { DoorWeltModule } from 'src/modules/product-constants/door-welt/door-welt.module';
import { DoorSlidingSystemModule } from 'src/modules/product-constants/door-sliding-system/door-sliding-system.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InteriorDoorEntity]),
    ProductProducersModule,
    TypeOfProductsModule,
    FurnitureModule,
    FabricMaterialWidthModule,
    DoorIsolationModule,
    DoorFrameMaterialModule,
    DoorSelectionBoardModule,
    DoorWeltModule,
    DoorSlidingSystemModule
  ],
  providers: [InteriorDoorService],
  controllers: [InteriorDoorController],
  exports: [
    TypeOrmModule.forFeature([InteriorDoorEntity])
  ]
})
export class InteriorDoorModule {}
