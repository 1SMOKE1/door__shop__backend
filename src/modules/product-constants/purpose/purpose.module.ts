import { Module } from '@nestjs/common';
import { PurposeService } from './services/purpose.service';
import { PurposeController } from './controllers/purpose.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurposeEntity } from './purpose.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurposeEntity])
  ],
  providers: [PurposeService],
  controllers: [PurposeController],
  exports: [
    TypeOrmModule.forFeature([PurposeEntity])
  ]
})
export class PurposeModule {}
