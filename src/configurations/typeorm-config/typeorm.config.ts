import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AdminEntity } from "src/modules/authorization/admin/admin.entity";
import { OurCommentEntity } from "src/modules/carousels/our-comments/our-comment.entity";
import { OurWorkEntity } from "src/modules/carousels/our-works/our-work.entity";
import { FreeConsultationEntity } from "src/modules/forms/free-consultation/free-consultation.entity";
import { FreeZamirEntity } from "src/modules/forms/free-zamir/free-zamir.entity";
import { OrderEntity } from "src/modules/orders/order.entity";
import { CamerasCountEntity } from "src/modules/product-constants/cameras-count/cameras-count.entity";
import { ChildLockEntity } from "src/modules/product-constants/child-lock/child-lock.entity";
import { DoorCoveringEntity } from "src/modules/product-constants/door-covering/door-covering.entity";
import { DoorFrameMaterialEntity } from "src/modules/product-constants/door-frame-material/door-frame-material.entity";
import { DoorInsulationEntity } from "src/modules/product-constants/door-insulation/door-insulation.entity";
import { DoorIsolationEntity } from "src/modules/product-constants/door-isolation/door-isolation.entity";
import { DoorSelectionBoardEntity } from "src/modules/product-constants/door-selection-board/door-selection-board.entity";
import { DoorSizeEntity } from "src/modules/product-constants/door-size/door-size.entity";
import { DoorSlidingSystemEntity } from "src/modules/product-constants/door-sliding-system/door-sliding-system.entity";
import { DoorWeightEntity } from "src/modules/product-constants/door-weight/door-weight.entity";
import { DoorWeltEntity } from "src/modules/product-constants/door-welt/door-welt.entity";
import { FabricMaterialWidthEntity } from "src/modules/product-constants/fabric-material-width/fabric-material-width.entity";
import { FeaturesEntity } from "src/modules/product-constants/features/features.entity";
import { FrameMaterialConstructionEntity } from "src/modules/product-constants/frame-material-construction/frame-material-construction.entity";
import { GlassPocketAddEntity } from "src/modules/product-constants/glass-pocket-add/glass-pocket-add.entity";
import { HousewifeStubEntity } from "src/modules/product-constants/housewife-stub/housewife-stub.entity";
import { MosquitNetEntity } from "src/modules/product-constants/mosquit-net/mosquit-net.entity";

import { OpeningTypeEntity } from "src/modules/product-constants/opening-type/opening-type.entity";
import { SealerCircuitEntity } from "src/modules/product-constants/sealer-circuit/sealer-circuit.entity";
import { SectionCountEntity } from "src/modules/product-constants/section-count/section-count.entity";
import { WindowEbbEntity } from "src/modules/product-constants/window-ebb/window-ebb.entity";
import { WindowHandEntity } from "src/modules/product-constants/window-hand/window-hand.entity";

import { WindowLaminationEntity } from "src/modules/product-constants/window-lamination/window-lamination.entity";
import { WindowProfileEntity } from "src/modules/product-constants/window-profile/window-profile.entity";
import { WindowSillEntity } from "src/modules/product-constants/window-sill/window-sill.entity";
import { ProductProducerEntity } from "src/modules/product-producers/product-producer.entity";
import { EntranceDoorEntity } from "src/modules/products/entrance-door/entrance-door.entity";
import { FurnitureEntity } from "src/modules/products/furniture/furniture.entity";
import { InteriorDoorEntity } from "src/modules/products/interior-door/interior-door.entity";
import { WindowEntity } from "src/modules/products/window/window.entity";
import { TypeOfProductEntity } from "src/modules/type-of-products/type-of-product.entity";

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.configService.get<string>("POSTGRES_HOST"),
      port: +this.configService.get<string>("POSTGRES_PORT"),
      username: this.configService.get<string>("POSTGRES_USER"),
      password: this.configService.get<string>("POSTGRES_PASSWORD"),
      database: this.configService.get<string>("POSTGRES_DATABASE"),
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


        CamerasCountEntity,
        ChildLockEntity,
        DoorCoveringEntity,
        DoorFrameMaterialEntity,
        DoorInsulationEntity,
        DoorIsolationEntity,
        DoorSelectionBoardEntity,
        DoorSizeEntity,
        DoorSlidingSystemEntity,
        DoorWeightEntity,
        DoorWeltEntity,
        FabricMaterialWidthEntity,
        FeaturesEntity,
        FrameMaterialConstructionEntity,
        GlassPocketAddEntity,
        HousewifeStubEntity,
        MosquitNetEntity,
        OpeningTypeEntity,
        SealerCircuitEntity,
        SectionCountEntity,
        WindowEbbEntity,
        WindowHandEntity,
        WindowLaminationEntity,
        WindowProfileEntity,
        WindowSillEntity,
        DoorCoveringEntity,

        OpeningTypeEntity,
        WindowProfileEntity,
        WindowLaminationEntity,
        FreeZamirEntity,
        FreeConsultationEntity,

        AdminEntity
      ],
      synchronize: true,
    };
  }
}

export default TypeOrmConfigService;
