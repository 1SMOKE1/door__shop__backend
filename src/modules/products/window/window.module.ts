import { Module } from '@nestjs/common';
import { WindowService } from './services/window.service';
import { WindowController } from './controllers/window.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowEntity } from './window.entity';
import { ProductProducersModule } from 'src/modules/product-producers/product-producers.module';
import { TypeOfProductsModule } from 'src/modules/type-of-products/type-of-products.module';
import { ConvertingService } from '../services/converting.service';
import { MosquitNetModule } from 'src/modules/product-constants/mosquit-net/mosquit-net.module';
import { WindowSillModule } from 'src/modules/product-constants/window-sill/window-sill.module';
import { WindowEbbModule } from 'src/modules/product-constants/window-ebb/window-ebb.module';
import { WindowHandModule } from 'src/modules/product-constants/window-hand/window-hand.module';
import { HousewifeStubModule } from 'src/modules/product-constants/housewife-stub/housewife-stub.module';
import { GlassPocketAddModule } from 'src/modules/product-constants/glass-pocket-add/glass-pocket-add.module';
import { WindowLaminationModule } from 'src/modules/product-constants/window-lamination/window-lamination.module';
import { WindowProfileModule } from 'src/modules/product-constants/window-profile/window-profile.module';
import { CamerasCountModule } from 'src/modules/product-constants/cameras-count/cameras-count.module';
import { FeaturesModule } from 'src/modules/product-constants/features/features.module';
import { SectionCountModule } from 'src/modules/product-constants/section-count/section-count.module';
import { ChildLockModule } from 'src/modules/product-constants/child-lock/child-lock.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowEntity]),
    ProductProducersModule,
    TypeOfProductsModule,
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
    CacheModule.register()
  ],
  providers: [WindowService, ConvertingService],
  controllers: [WindowController],
  exports: [
    TypeOrmModule.forFeature([WindowEntity])
  ]
})
export class WindowModule {}
