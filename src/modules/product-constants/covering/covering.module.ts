import { Module } from '@nestjs/common';
import { CoveringController } from './controllers/covering.controller';
import { CoveringService } from './services/covering.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoveringEntity } from './covering.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoveringEntity])
  ],
  controllers: [CoveringController],
  providers: [CoveringService],
  exports: [
    TypeOrmModule.forFeature([CoveringEntity])
  ]
})
export class CoveringModule {}
