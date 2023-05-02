import { Module } from "@nestjs/common";
import { DoorCoveringController } from "./controllers/door-covering.controller";
import { DoorCoveringService } from "./services/door-covering.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoorCoveringEntity } from "./door-covering.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DoorCoveringEntity])],
  controllers: [DoorCoveringController],
  providers: [DoorCoveringService],
  exports: [TypeOrmModule.forFeature([DoorCoveringEntity])],
})
export class DoorCoveringModule {}
