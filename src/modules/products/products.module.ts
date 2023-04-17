import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { EntranceDoorModule } from './entrance-door/entrance-door.module';
import { FurnitureModule } from './furniture/furniture.module';
import { InteriorDoorModule } from './interior-door/interior-door.module';
import { WindowModule } from './window/window.module';

@Module({
  imports: [
    EntranceDoorModule,
    FurnitureModule,
    InteriorDoorModule,
    WindowModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
