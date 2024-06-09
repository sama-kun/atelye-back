import { Module, forwardRef } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@/database/entities/order.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    // MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])
    TypeOrmModule.forFeature([OrderEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [OrderService],
})
export class OrderModule {}
