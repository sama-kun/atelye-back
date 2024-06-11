import { HuetaEntity } from '../entities/hueta.entity';
import { MaterialEntity } from '../entities/material.entity';
import { OrderEntity } from '../entities/order.entity';
import { ServiceEntity } from '../entities/service.entity';

export const huetas: Partial<HuetaEntity>[] = [
  {
    service: {
      id: 1,
    } as ServiceEntity,
    material: {
      id: 1,
    } as MaterialEntity,
    quantity: 2,
    length: 20,
    width: 20,
    description: 'Test desc',
    order: {
      id: 1,
    } as OrderEntity,
  },
  {
    service: {
      id: 2,
    } as ServiceEntity,
    material: {
      id: 2,
    } as MaterialEntity,
    quantity: 3,
    length: 20,
    width: 20,
    description: 'Test desc',
    order: {
      id: 1,
    } as OrderEntity,
  },
  {
    service: {
      id: 3,
    } as ServiceEntity,
    material: {
      id: 3,
    } as MaterialEntity,
    quantity: 4,
    length: 20,
    width: 20,
    description: 'Test desc',
    order: {
      id: 2,
    } as OrderEntity,
  },
  {
    service: {
      id: 1,
    } as ServiceEntity,
    material: {
      id: 1,
    } as MaterialEntity,
    quantity: 2,
    length: 20,
    width: 20,
    description: 'Test desc',
    order: {
      id: 2,
    } as OrderEntity,
  },
  {
    service: {
      id: 2,
    } as ServiceEntity,
    material: {
      id: 2,
    } as MaterialEntity,
    quantity: 3,
    length: 20,
    width: 20,
    description: 'Test desc',
    order: {
      id: 2,
    } as OrderEntity,
  },
  {
    service: {
      id: 3,
    } as ServiceEntity,
    material: {
      id: 3,
    } as MaterialEntity,
    quantity: 4,
    length: 20,
    width: 20,
    description: 'Test desc',
    order: {
      id: 2,
    } as OrderEntity,
  },
];
