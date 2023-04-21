import { Module } from '@nestjs/common';
import { FabricMaterialController } from './controllers/fabric-material.controller';
import { FabricMaterialService } from './services/fabric-material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricMaterialEntity } from './fabric-material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FabricMaterialEntity])
  ],
  controllers: [FabricMaterialController],
  providers: [FabricMaterialService],
  exports: [TypeOrmModule.forFeature([FabricMaterialEntity])]
})
export class FabricMaterialModule {}
