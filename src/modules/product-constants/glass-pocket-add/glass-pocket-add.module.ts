import { Module } from '@nestjs/common';
import { GlassPocketAddService } from './services/glass-pocket-add.service';
import { GlassPocketAddController } from './controllers/glass-pocket-add.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlassPocketAddEntity } from './glass-pocket-add.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GlassPocketAddEntity])
  ],
  providers: [GlassPocketAddService],
  controllers: [GlassPocketAddController],
  exports: [
    TypeOrmModule.forFeature([GlassPocketAddEntity])
  ]
})
export class GlassPocketAddModule {}
