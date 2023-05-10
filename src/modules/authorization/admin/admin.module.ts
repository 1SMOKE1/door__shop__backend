import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity])
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [
    TypeOrmModule.forFeature([AdminEntity])
  ]
})
export class AdminModule {}
