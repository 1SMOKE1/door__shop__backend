import { Module } from '@nestjs/common';
import { FreeZamirService } from './services/free-zamir.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreeZamirEntity } from './free-zamir.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FreeZamirEntity])
  ],
  providers: [FreeZamirService],
  exports: [
    TypeOrmModule.forFeature([FreeZamirEntity])
  ]
})
export class FreeZamirModule {}
