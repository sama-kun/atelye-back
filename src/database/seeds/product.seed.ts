import { CategoryEntity } from '../entities/category.entity';
import { ProductEntity } from '../entities/product.entity';

export const products: Partial<ProductEntity>[] = [
  {
    category: {
      id: 1,
    } as CategoryEntity,
    orderDate: new Date('2024-06-10'),
    receptionDate: new Date('2024-06-15'),
    amount: 20,
    money: 20000,
  },
  {
    category: {
      id: 1,
    } as CategoryEntity,
    orderDate: new Date('2024-06-10'),
    receptionDate: new Date('2024-06-15'),
    amount: 25,
    money: 25000,
  },
  {
    category: {
      id: 2,
    } as CategoryEntity,
    orderDate: new Date('2024-06-10'),
    receptionDate: new Date('2024-06-15'),
    amount: 22,
    money: 22000,
  },
];
