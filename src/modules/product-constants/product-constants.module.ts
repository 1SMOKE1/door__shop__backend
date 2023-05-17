import { Module } from "@nestjs/common";



import { WindowLaminationModule } from "./window-lamination/window-lamination.module";
import { WindowProfileModule } from "./window-profile/window-profile.module";
import { DoorIsolationModule } from './door-isolation/door-isolation.module';
import { DoorSelectionBoardModule } from './door-selection-board/door-selection-board.module';
import { DoorWeltModule } from './door-welt/door-welt.module';
import { DoorSlidingSystemModule } from './door-sliding-system/door-sliding-system.module';
import { DoorInsulationModule } from './door-insulation/door-insulation.module';
import { FabricMaterialWidthModule } from './fabric-material-width/fabric-material-width.module';
import { DoorSizeModule } from './door-size/door-size.module';
import { DoorWeightModule } from './door-weight/door-weight.module';
import { FrameMaterialConstructionModule } from './frame-material-construction/frame-material-construction.module';
import { SealerCircuitModule } from './sealer-circuit/sealer-circuit.module';
import { MosquitNetModule } from './mosquit-net/mosquit-net.module';
import { WindowSillModule } from './window-sill/window-sill.module';
import { WindowEbbModule } from './window-ebb/window-ebb.module';
import { WindowHandModule } from './window-hand/window-hand.module';
import { ChildLockModule } from './child-lock/child-lock.module';
import { HousewifeStubModule } from './housewife-stub/housewife-stub.module';
import { GlassPocketAddModule } from './glass-pocket-add/glass-pocket-add.module';
import { CamerasCountModule } from './cameras-count/cameras-count.module';
import { FeaturesModule } from './features/features.module';
import { SectionCountModule } from './section-count/section-count.module';
import { DoorFrameMaterialModule } from "./door-frame-material/door-frame-material.module";
import { OpeningTypeModule } from "./opening-type/opening-type.module";
import { DoorCoveringModule } from "./door-covering/door-covering.module";



@Module({
  imports: [
    WindowProfileModule,
    WindowLaminationModule,
    DoorIsolationModule,
    DoorSelectionBoardModule,
    DoorFrameMaterialModule,
    DoorWeltModule,
    DoorSlidingSystemModule,
    DoorInsulationModule,
    FabricMaterialWidthModule,
    DoorSizeModule,
    DoorWeightModule,
    FrameMaterialConstructionModule,
    SealerCircuitModule,
    MosquitNetModule,
    WindowSillModule,
    WindowEbbModule,
    WindowHandModule,
    ChildLockModule,
    HousewifeStubModule,
    GlassPocketAddModule,
    CamerasCountModule,
    FeaturesModule,
    SectionCountModule,
    OpeningTypeModule,
    DoorCoveringModule,
  ],
})
export class ProductConstantsModule {}
