import { Module } from '@nestjs/common';
import { ChildLockService } from './services/child-lock.service';
import { ChildLockController } from './controllers/child-lock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildLockEntity } from './child-lock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChildLockEntity])
  ],
  providers: [ChildLockService],
  controllers: [ChildLockController],
  exports: [
    TypeOrmModule.forFeature([ChildLockEntity])
  ]
})
export class ChildLockModule {}
