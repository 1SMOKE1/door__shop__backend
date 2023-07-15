import { Module } from '@nestjs/common';
import { ExcelAndPhotosController } from './controllers/excel-and-photos.controller';
import { ExcelAndPhotosService } from './services/excel-and-photos.service';
import { ProductProducersModule } from '../product-producers/product-producers.module';
import { TypeOfProductsModule } from '../type-of-products/type-of-products.module';
import { InteriorDoorModule } from '../products/interior-door/interior-door.module';
import { FabricMaterialWidthModule } from '../product-constants/fabric-material-width/fabric-material-width.module';
import { ConvertingService } from '../products/services/converting.service';
import { DoorIsolationModule } from '../product-constants/door-isolation/door-isolation.module';
import { DoorFrameMaterialModule } from '../product-constants/door-frame-material/door-frame-material.module';
import { DoorSelectionBoardModule } from '../product-constants/door-selection-board/door-selection-board.module';
import { DoorWeltModule } from '../product-constants/door-welt/door-welt.module';
import { FurnitureModule } from '../products/furniture/furniture.module';
import { DoorSlidingSystemModule } from '../product-constants/door-sliding-system/door-sliding-system.module';
import { InteriorDoorService } from '../products/interior-door/services/interior-door.service';
import { CacheModule } from '@nestjs/cache-manager';
import { EntranceDoorService } from '../products/entrance-door/services/entrance-door.service';
import { WindowService } from '../products/window/services/window.service';
import { FurnitureService } from '../products/furniture/services/furniture.service';
import { EntranceDoorModule } from '../products/entrance-door/entrance-door.module';
import { DoorInsulationModule } from '../product-constants/door-insulation/door-insulation.module';
import { DoorCoveringModule } from '../product-constants/door-covering/door-covering.module';
import { OpeningTypeModule } from '../product-constants/opening-type/opening-type.module';
import { DoorSizeModule } from '../product-constants/door-size/door-size.module';
import { DoorWeightModule } from '../product-constants/door-weight/door-weight.module';
import { FrameMaterialConstructionModule } from '../product-constants/frame-material-construction/frame-material-construction.module';
import { SealerCircuitModule } from '../product-constants/sealer-circuit/sealer-circuit.module';
import { WindowModule } from '../products/window/window.module';
import { MosquitNetModule } from '../product-constants/mosquit-net/mosquit-net.module';
import { WindowSillModule } from '../product-constants/window-sill/window-sill.module';
import { WindowEbbModule } from '../product-constants/window-ebb/window-ebb.module';
import { WindowHandModule } from '../product-constants/window-hand/window-hand.module';
import { ChildLockModule } from '../product-constants/child-lock/child-lock.module';
import { HousewifeStubModule } from '../product-constants/housewife-stub/housewife-stub.module';
import { GlassPocketAddModule } from '../product-constants/glass-pocket-add/glass-pocket-add.module';
import { WindowLaminationModule } from '../product-constants/window-lamination/window-lamination.module';
import { WindowProfileModule } from '../product-constants/window-profile/window-profile.module';
import { CamerasCountModule } from '../product-constants/cameras-count/cameras-count.module';
import { FeaturesModule } from '../product-constants/features/features.module';
import { SectionCountModule } from '../product-constants/section-count/section-count.module';

@Module({
  imports: [
    ProductProducersModule,
    TypeOfProductsModule,
    InteriorDoorModule,
    FabricMaterialWidthModule,
    DoorIsolationModule,
    DoorFrameMaterialModule,
    DoorSelectionBoardModule,
    DoorWeltModule,
    FurnitureModule,
    DoorSlidingSystemModule,
    CacheModule.register(),
    EntranceDoorModule,
    FurnitureModule,
    DoorInsulationModule,
    DoorCoveringModule,
    OpeningTypeModule,
    DoorSizeModule,
    DoorWeightModule,
    FrameMaterialConstructionModule,
    SealerCircuitModule,
    WindowModule,
    MosquitNetModule,
    WindowSillModule,
    WindowEbbModule,
    WindowHandModule,
    ChildLockModule,
    HousewifeStubModule,
    GlassPocketAddModule,
    WindowLaminationModule,
    WindowProfileModule,
    CamerasCountModule,
    FeaturesModule,
    SectionCountModule,
  ],
  controllers: [ExcelAndPhotosController],
  providers: [ExcelAndPhotosService, ConvertingService, InteriorDoorService, EntranceDoorService, WindowService, FurnitureService]
})
export class ExcelAndPhotosModule {}
