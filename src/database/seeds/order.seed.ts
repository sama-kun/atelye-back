import { OrderEntity } from '../entities/order.entity';
import { UserEntity } from '../entities/user.entity';
import { OrderStatusEnum } from '@/interfaces/enums';

export const orders: Partial<OrderEntity>[] = [
  {
    name: 'Nurdaulet',
    surname: 'Jaksylykov',
    phone: '87072863573',
    startDate: new Date('2024-05-23'),
    deadline: new Date('2024-06-01'),
    employee: {
      id: 4,
    } as UserEntity,
    amount: 10000,
    status: OrderStatusEnum.done,
  },
  {
    name: 'Nurdaulet',
    surname: 'Jaksylykov',
    phone: '87072863573',
    startDate: new Date('2024-06-01'),
    deadline: new Date('2024-06-20'),
    employee: {
      id: 4,
    } as UserEntity,
    amount: 10000,
    status: OrderStatusEnum.inProcess,
  },
];
