import { Module } from '@nestjs/common';
import { InstallationTypeController } from './controllers/installation-type.controller';
import { InstallationTypeService } from './services/installation-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallationTypeEntity } from './installation-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstallationTypeEntity])
  ],
  controllers: [InstallationTypeController],
  providers: [InstallationTypeService],
  exports: [
    TypeOrmModule.forFeature([InstallationTypeEntity])
  ]
})
export class InstallationTypeModule {}
