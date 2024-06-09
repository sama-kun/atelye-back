import { PartialType } from '@nestjs/swagger';
import { OrderEntity } from '@/database/entities/order.entity';

export class CreateOrderDto extends PartialType(OrderEntity) {}
