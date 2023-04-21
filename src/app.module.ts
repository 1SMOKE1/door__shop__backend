import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProducersModule } from './modules/product-producers/product-producers.module';
import { TypeOfProductsModule } from './modules/type-of-products/type-of-products.module';
import { EntranceDoorModule } from './modules/products/entrance-door/entrance-door.module';
import { InteriorDoorModule } from './modules/products/interior-door/interior-door.module';
import { WindowModule } from './modules/products/window/window.module';
import { FurnitureModule } from './modules/products/furniture/furniture.module';
import { MulterModule } from '@nestjs/platform-express';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OurWorksModule } from './modules/our-works/our-works.module';
import { OurCommentsModule } from './modules/our-comments/our-comments.module';
import { AmountOfSealingMaterialsModule } from './modules/product-constants/amount-of-sealing-materials/amount-of-sealing-materials.module';
import { FabricMaterialModule } from './modules/product-constants/fabric-material/fabric-material.module';
import { PurposeModule } from './modules/product-constants/purpose/purpose.module';
import { OpeningMethodModule } from './modules/product-constants/opening-method/opening-method.module';
import { CoveringModule } from './modules/product-constants/covering/covering.module';
import { FrameMaterialModule } from './modules/product-constants/frame-material/frame-material.module';
import { FinishingTheSurfaceModule } from './modules/product-constants/finishing-the-surface/finishing-the-surface.module';
import { StructuralFeaturesModule } from './modules/product-constants/structural-features/structural-features.module';
import { OpeningTypeModule } from './modules/product-constants/opening-type/opening-type.module';
import { InstallationTypeModule } from './modules/product-constants/installation-type/installation-type.module';
import { WindowProfileModule } from './modules/product-constants/window-profile/window-profile.module';
import { WindowConstructionModule } from './modules/product-constants/window-construction/window-construction.module';
import { WindowGlassUnitModule } from './modules/product-constants/window-glass-unit/window-glass-unit.module';
import { WindowLaminationModule } from './modules/product-constants/window-lamination/window-lamination.module';
import { WindowGlassesModule } from './modules/product-constants/window-glasses/window-glasses.module';
import TypeOrmConfigService from './configurations/typeorm-config/typeorm.config';
import MailerConfigService from './configurations/mailer-config/mailer.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    MailerModule.forRootAsync({
      useClass: MailerConfigService
    }),
    ProductProducersModule,
    TypeOfProductsModule,
    EntranceDoorModule,
    InteriorDoorModule,
    WindowModule,
    FurnitureModule,
    ProductsModule,
    OrdersModule,
    OurWorksModule,
    OurCommentsModule,
    OurCommentsModule,
    
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
