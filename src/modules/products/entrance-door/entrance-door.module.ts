import { Module } from '@nestjs/common';
import { EntranceDoorService } from './services/entrance-door.service';
import { EntranceDoorController } from './controllers/entrance-door.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntranceDoorEntity } from './entrance-door.entity';
import { ProductProducersModule } from 'src/modules/product-producers/product-producers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntranceDoorEntity]),
    ProductProducersModule
  ],
  providers: [EntranceDoorService],
  controllers: [EntranceDoorController],
  exports: [
    TypeOrmModule.forFeature([EntranceDoorEntity])
  ],
})
export class EntranceDoorModule {}
