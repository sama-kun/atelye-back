import { CategoryEntity } from '../entities/category.entity';
import { MaterialEntity } from '../entities/material.entity';

export const categories: CategoryEntity[] = [
  {
    id: 1,
    name: 'Желтая Лента',
    material: {
      id: 1,
    } as MaterialEntity,
  },
  {
    id: 2,
    name: 'Красная лента',
    material: {
      id: 1,
    } as MaterialEntity,
  },
  {
    id: 3,
    name: 'Ткань',
    material: {
      id: 2,
    } as MaterialEntity,
  },
  {
    id: 4,
    name: 'Хлопок',
    material: {
      id: 3,
    } as MaterialEntity,
  },
  {
    id: 5,
    name: 'Вышивка',
    material: {
      id: 4,
    } as MaterialEntity,
  },
  {
    id: 6,
    name: 'Джинсы',
    material: {
      id: 5,
    } as MaterialEntity,
  },
  {
    id: 7,
    name: 'Синтетика',
    material: {
      id: 6,
    } as MaterialEntity,
  },
  {
    id: 8,
    name: 'Пуговицы и молнии',
    material: {
      id: 7,
    } as MaterialEntity,
  },
  {
    id: 9,
    name: 'Шерсть',
    material: {
      id: 8,
    } as MaterialEntity,
  },
];
