import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity])
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
