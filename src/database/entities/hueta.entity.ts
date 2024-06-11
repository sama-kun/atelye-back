import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IHueta } from '@/interfaces/entities';
import { BaseModel } from '@/common/base/BaseModel';
import { ServiceEntity } from './service.entity';
import { MaterialEntity } from './material.entity';
import { OrderEntity } from './order.entity';

@Entity('huetas')
export class HuetaEntity extends BaseModel implements IHueta {
  @ManyToOne(() => ServiceEntity, { cascade: true }) // Предполагаем, что в Service есть свойство 'orders'
  @JoinColumn()
  @ApiProperty({ type: () => ServiceEntity })
  service: ServiceEntity;

  @ManyToOne(() => MaterialEntity, { nullable: true })
  @JoinColumn()
  material?: MaterialEntity;

  @ManyToOne(() => OrderEntity, (order) => order.huetas, { nullable: true })
  @JoinColumn()
  order?: OrderEntity;

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
}
