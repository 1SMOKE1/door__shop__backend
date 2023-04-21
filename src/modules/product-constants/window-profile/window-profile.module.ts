import { Module } from '@nestjs/common';
import { WindowProfileService } from './services/window-profile.service';
import { WindowProfileController } from './controllers/window-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WindowProfileEntity } from './window-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WindowProfileEntity])
  ],
  providers: [WindowProfileService],
  controllers: [WindowProfileController],
  exports: [
    TypeOrmModule.forFeature([WindowProfileEntity])
  ]
})
export class WindowProfileModule {}
