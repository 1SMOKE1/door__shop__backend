import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProducersModule } from './modules/product-producers/product-producers.module';
import { ProductProducerEntity } from './modules/product-producers/product-producer.entity';
import { TypeOfProductsModule } from './modules/type-of-products/type-of-products.module';
import { TypeOfProductEntity } from './modules/type-of-products/type-of-product.entity';
import { EntranceDoorEntity } from './modules/products/entrance-door/entrance-door.entity';
import { InteriorDoorEntity } from './modules/products/interior-door/interior-door.entity';
import { WindowEntity } from './modules/products/window/window.entity';
import { FurnitureEntity } from './modules/products/furniture/furniture.entity';
import { EntranceDoorModule } from './modules/products/entrance-door/entrance-door.module';
import { InteriorDoorModule } from './modules/products/interior-door/interior-door.module';
import { WindowModule } from './modules/products/window/window.module';
import { FurnitureModule } from './modules/products/furniture/furniture.module';
import { MulterModule } from '@nestjs/platform-express';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderEntity } from './modules/orders/order.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: +configService.get<string>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [
          ProductProducerEntity,
          TypeOfProductEntity,
          EntranceDoorEntity,
          InteriorDoorEntity,
          WindowEntity,
          FurnitureEntity,
          OrderEntity
        ],
        synchronize: true,
      }),
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: configService.get('MAILER_SERVICE'),
          host: configService.get('MAILER_HOST'),
          auth: {
            user: configService.get('MAILER_USER'),
            pass: configService.get('MAILER_PASS')
          }
        }
      }),
      inject: [ConfigService]
    }),
    ProductProducersModule,
    TypeOfProductsModule,
    EntranceDoorModule,
    InteriorDoorModule,
    WindowModule,
    FurnitureModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
