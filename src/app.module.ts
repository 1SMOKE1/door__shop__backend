import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProducersModule } from './modules/product-producers/product-producers.module';
import { TypeOfProductsModule } from './modules/type-of-products/type-of-products.module';
import { MulterModule } from '@nestjs/platform-express';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ExcelAndPhotosModule } from './modules/excel-and-photos/excel-and-photos.module';
import { FormsModule } from './modules/forms/forms.module';
import { ProductConstantsModule } from './modules/product-constants/product-constants.module';
import { CarouselsModule } from './modules/carousels/carousels.module';
import TypeOrmConfigService from './configurations/typeorm-config/typeorm.config';
import MailerConfigService from './configurations/mailer-config/mailer.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthorizationModule } from './modules/authorization/authorization.module';




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
    ProductsModule,
    OrdersModule,
    CarouselsModule,
    
    ProductConstantsModule,
    ExcelAndPhotosModule,
    FormsModule,
    CarouselsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'images'),
      serveRoot: '/uploads/images',
      serveStaticOptions: {
        index: false
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'our-comments'),
      serveRoot: '/uploads/our-comments',
      serveStaticOptions: {
        index: false
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'our-works'),
      serveRoot: '/uploads/our-works',
      serveStaticOptions: {
        index: false
      }
    }),
    
    AuthorizationModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
