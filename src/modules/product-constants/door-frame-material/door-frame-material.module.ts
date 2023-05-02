import { Module } from "@nestjs/common";
import { FrameMaterialController } from "./controllers/door-frame-material.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoorFrameMaterialEntity } from "./door-frame-material.entity";
import { DoorFrameMaterialService } from "./services/door-frame-material.service";

@Module({
  imports: [TypeOrmModule.forFeature([DoorFrameMaterialEntity])],
  controllers: [FrameMaterialController],
  providers: [DoorFrameMaterialService],
  exports: [TypeOrmModule.forFeature([DoorFrameMaterialEntity])],
})
export class DoorFrameMaterialModule {}
