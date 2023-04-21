import { Module } from '@nestjs/common';
import { AmountOfSealingMaterialsController } from './controllers/amount-of-sealing-materials.controller';
import { AmountOfSealingMaterialsService } from './services/amount-of-sealing-materials.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmountOfSealingMaterialEntity } from './amount-of-sealing-material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AmountOfSealingMaterialEntity])
  ],
  controllers: [AmountOfSealingMaterialsController],
  providers: [AmountOfSealingMaterialsService],
  exports: [
    TypeOrmModule.forFeature([AmountOfSealingMaterialEntity])
  ]
})
export class AmountOfSealingMaterialsModule {}
