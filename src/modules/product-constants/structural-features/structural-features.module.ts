import { Module } from '@nestjs/common';
import { StructuralFeaturesService } from './services/structural-features.service';
import { StructuralFeaturesController } from './controllers/structural-features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StructuralFeatureEntity } from './structural-feature.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StructuralFeatureEntity])
  ],
  providers: [StructuralFeaturesService],
  controllers: [StructuralFeaturesController],
  exports: [
    TypeOrmModule.forFeature([StructuralFeatureEntity])
  ]
})
export class StructuralFeaturesModule {}
