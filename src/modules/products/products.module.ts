import { MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { EntranceDoorModule } from './entrance-door/entrance-door.module';
import { FurnitureModule } from './furniture/furniture.module';
import { InteriorDoorModule } from './interior-door/interior-door.module';
import { WindowModule } from './window/window.module';
import { ConvertingService } from './services/converting.service';
import { CreateQueryBuilderService } from './services/create-query-builder.service';
import { FiltrationService } from './services/filtration.service';
import * as compression from 'compression'; 
import { CacheModule } from '@nestjs/cache-manager';
import { FileService } from './services/file.service';

@Module({
  imports: [
    EntranceDoorModule,
    FurnitureModule,
    InteriorDoorModule,
    WindowModule,
    CacheModule.register()
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ConvertingService, CreateQueryBuilderService, FiltrationService, FileService]
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(compression({
      level: 1,
      threshold: 512
    })).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
