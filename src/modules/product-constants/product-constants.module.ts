import { Module } from '@nestjs/common';
import { AmountOfSealingMaterialsModule } from './amount-of-sealing-materials/amount-of-sealing-materials.module';
import { CoveringModule } from './covering/covering.module';
import { FabricMaterialModule } from './fabric-material/fabric-material.module';
import { FinishingTheSurfaceModule } from './finishing-the-surface/finishing-the-surface.module';
import { FrameMaterialModule } from './frame-material/frame-material.module';
import { InstallationTypeModule } from './installation-type/installation-type.module';
import { OpeningMethodModule } from './opening-method/opening-method.module';
import { OpeningTypeModule } from './opening-type/opening-type.module';
import { PurposeModule } from './purpose/purpose.module';
import { StructuralFeaturesModule } from './structural-features/structural-features.module';
import { WindowConstructionModule } from './window-construction/window-construction.module';
import { WindowGlassUnitModule } from './window-glass-unit/window-glass-unit.module';
import { WindowGlassesModule } from './window-glasses/window-glasses.module';
import { WindowLaminationModule } from './window-lamination/window-lamination.module';
import { WindowProfileModule } from './window-profile/window-profile.module';

@Module({
  imports: [
    AmountOfSealingMaterialsModule,
    FabricMaterialModule,
    PurposeModule,
    OpeningMethodModule,
    CoveringModule,
    FrameMaterialModule,
    FinishingTheSurfaceModule,
    StructuralFeaturesModule,
    OpeningTypeModule,
    InstallationTypeModule,
    WindowProfileModule,
    WindowConstructionModule,
    WindowGlassUnitModule,
    WindowLaminationModule,
    WindowGlassesModule,
  ]
})
export class ProductConstantsModule {}
