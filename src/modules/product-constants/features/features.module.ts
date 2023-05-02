import { Module } from '@nestjs/common';
import { FeaturesService } from './services/features.service';
import { FeaturesController } from './controllers/features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesEntity } from './features.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeaturesEntity])
  ],
  providers: [FeaturesService],
  controllers: [FeaturesController],
  exports: [
    TypeOrmModule.forFeature([FeaturesEntity])
  ]
})
export class FeaturesModule {}
