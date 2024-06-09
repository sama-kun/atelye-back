import { BaseService } from '@/common/base/BaseService';
import { OrderEntity } from '@/database/entities/order.entity';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RoleEnum } from '@/interfaces/enums';
// const console = new Logger('OrderService');

@Injectable()
export class OrderService extends BaseService<
  OrderEntity,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(
    @InjectRepository(OrderEntity)
    protected repo: Repository<OrderEntity>,
  ) {
    super();
  }
}
