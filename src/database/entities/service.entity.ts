import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseModel } from '@/common/base/BaseModel';
// import { OrderEntity } from './order.entity'; // Предполагаем, что файл называется OrderEntity.ts
import { IService } from '@/interfaces/entities';

@Entity('services')
export class ServiceEntity extends BaseModel implements IService {
  @ApiProperty({ description: 'The title of the service' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty({ description: 'Cost of the service' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  // @OneToMany(() => OrderEntity, (order) => order.service, { nullable: true })
  // @ApiProperty({
  //   type: () => OrderEntity,
  //   isArray: true,
  //   description: 'List of orders associated with this service',
  // })
  // orders?: OrderEntity[];
}
