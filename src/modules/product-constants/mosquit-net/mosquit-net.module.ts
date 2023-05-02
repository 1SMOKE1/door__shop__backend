import { Module } from '@nestjs/common';
import { MosquitNetService } from './services/mosquit-net.service';
import { MosquitNetController } from './controllers/mosquit-net.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MosquitNetEntity } from './mosquit-net.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MosquitNetEntity])
  ],
  providers: [MosquitNetService],
  controllers: [MosquitNetController],
  exports: [
    TypeOrmModule.forFeature([MosquitNetEntity])
  ]
})
export class MosquitNetModule {}
