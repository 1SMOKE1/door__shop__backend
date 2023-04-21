import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { OrderEntity } from "src/modules/orders/order.entity";
import { OurCommentEntity } from "src/modules/our-comments/our-comment.entity";
import { OurWorkEntity } from "src/modules/our-works/our-work.entity";
import { AmountOfSealingMaterialEntity } from "src/modules/product-constants/amount-of-sealing-materials/amount-of-sealing-material.entity";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { EntranceDoorEntity } from "src/modules/products/entrance-door/entrance-door.entity";
import { FurnitureEntity } from "src/modules/products/furniture/furniture.entity";
import { InteriorDoorEntity } from "src/modules/products/interior-door/interior-door.entity";
import { WindowEntity } from "src/modules/products/window/window.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {

  constructor(
    private readonly configService: ConfigService
  ){}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
        host: this.configService.get<string>('POSTGRES_HOST'),
        port: +this.configService.get<string>('POSTGRES_PORT'),
        username: this.configService.get<string>('POSTGRES_USER'),
        password: this.configService.get<string>('POSTGRES_PASSWORD'),
        database: this.configService.get<string>('POSTGRES_DATABASE'),
        entities: [
          ProductProducerEntity,
          TypeOfProductEntity,
          EntranceDoorEntity,
          InteriorDoorEntity,
          WindowEntity,
          FurnitureEntity,
          OrderEntity,
          OurWorkEntity,
          OurCommentEntity,

          AmountOfSealingMaterialEntity
        ],
        synchronize: true,
    };
    
  }
}

export default TypeOrmConfigService;

