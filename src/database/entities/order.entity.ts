import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserEntity } from './user.entity';
import { IOrder } from '@/interfaces/entities';
import { BaseModel } from '@/common/base/BaseModel';
import { OrderStatusEnum } from '@/interfaces/enums';
import { ServiceEntity } from './service.entity';

@Entity('orders')
export class OrderEntity extends BaseModel implements IOrder {
  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: false })
  surname: string;

  @ApiProperty()
  @Column({ nullable: false })
  phone: string;

  @ApiPropertyOptional()
  @Column({ type: 'timestamp', nullable: true })
  startDate?: Date;

  @ApiPropertyOptional()
  @Column({ type: 'timestamp', nullable: true })
  deadline?: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders, { cascade: true }) // Предполагаем, что в User есть свойство 'orders'
  @JoinColumn()
  @ApiProperty({ type: () => UserEntity, example: 1 })
  employee: UserEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.orders, { eager: true }) // Предполагаем, что в Service есть свойство 'orders'
  @JoinColumn()
  @ApiProperty({ type: () => ServiceEntity })
  service: ServiceEntity;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  length?: number;

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  width?: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  description?: string;

  @ApiPropertyOptional()
  @Column({ type: 'decimal', nullable: true })
  amount?: number;

  @ApiProperty({ enum: OrderStatusEnum })
  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.inProcess,
  })
  status: OrderStatusEnum;
}
