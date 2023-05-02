import { Module } from '@nestjs/common';
import { FabricMaterialWidthController } from './controllers/fabric-material-width.controller';
import { FabricMaterialWidthService } from './services/fabric-material-width.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricMaterialWidthEntity } from './fabric-material-width.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FabricMaterialWidthEntity])
  ],
  controllers: [FabricMaterialWidthController],
  providers: [FabricMaterialWidthService],
  exports: [
    TypeOrmModule.forFeature([FabricMaterialWidthEntity])
  ]
})
export class FabricMaterialWidthModule {}
