import { Module } from '@nestjs/common';
import { HousewifeStubService } from './services/housewife-stub.service';
import { HousewifeStubController } from './controllers/housewife-stub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HousewifeStubEntity } from './housewife-stub.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HousewifeStubEntity])
  ],
  providers: [HousewifeStubService],
  controllers: [HousewifeStubController],
  exports: [
    TypeOrmModule.forFeature([HousewifeStubEntity])
  ]
})
export class HousewifeStubModule {}
