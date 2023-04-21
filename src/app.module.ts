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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
