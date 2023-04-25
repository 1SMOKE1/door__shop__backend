import { Module } from '@nestjs/common';
import { OurWorksController } from './controllers/our-works.controller';
import { OurWorksService } from './services/our-works.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OurWorkEntity } from './our-work.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OurWorkEntity
    ])
  ],
  controllers: [OurWorksController],
  providers: [OurWorksService],
  exports: [
    TypeOrmModule.forFeature([OurWorkEntity])
  ]
})
export class OurWorksModule {}
