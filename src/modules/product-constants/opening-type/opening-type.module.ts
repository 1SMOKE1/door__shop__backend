import { Module } from '@nestjs/common';
import { OpeningTypeController } from './controllers/opening-type.controller';
import { OpeningTypeService } from './services/opening-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpeningTypeEntity } from './opening-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpeningTypeEntity])
  ],
  controllers: [OpeningTypeController],
  providers: [OpeningTypeService],
  exports: [TypeOrmModule.forFeature([OpeningTypeEntity])]
})
export class OpeningTypeModule {}
