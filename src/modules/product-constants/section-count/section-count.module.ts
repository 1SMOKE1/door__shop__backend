import { Module } from '@nestjs/common';
import { SectionCountService } from './services/section-count.service';
import { SectionCountController } from './controllers/section-count.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionCountEntity } from './section-count.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SectionCountEntity])
  ],
  providers: [SectionCountService],
  controllers: [SectionCountController],
  exports: [
    TypeOrmModule.forFeature([SectionCountEntity])
  ]
})
export class SectionCountModule {}
