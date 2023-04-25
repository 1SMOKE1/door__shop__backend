import { Module } from '@nestjs/common';
import { FreeConsultationService } from './services/free-consultation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreeConsultationEntity } from './free-consultation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FreeConsultationEntity])
  ],
  providers: [FreeConsultationService],
  exports: [
    TypeOrmModule.forFeature([FreeConsultationEntity])
  ]
})
export class FreeConsultationModule {}
