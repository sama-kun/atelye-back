import { MaterialTypeEnum } from '@/interfaces/enums';
import { MaterialEntity } from '../entities/material.entity';
import { ProviderEntity } from '../entities/provider.entity';

export const materials: MaterialEntity[] = [
  {
    id: 1,
    title: 'Ленты',
    total: 45,
    cost: 490,
    type: MaterialTypeEnum.metr,
    image: '/Hlopok.jpg',
    provider: {
      id: 1,
    } as ProviderEntity,
  },
  {
    id: 2,
    title: 'Ткань',
    image: '/Hlopok.jpg',
    total: 45,
    cost: 1590,
    // units: unit.find((u) => u.name === 'м2'),
    type: MaterialTypeEnum.metr2,
    provider: {
      id: 1,
    } as ProviderEntity,
  },
  {
    id: 3,
    title: 'Хлопок',
    image: '/Hlopok.jpg',
    total: 45,
    cost: 2090,
    // units: unit.find((u) => u.name === 'м2'),
    type: MaterialTypeEnum.metr2,
    provider: {
      id: 2,
    } as ProviderEntity,
  },
  {
    id: 4,
    title: 'Вышивка',
    image: '/вышивка.jpg',
    total: 45,
    cost: 590,
    // units: unit.find((u) => u.name === 'м2'),
    type: MaterialTypeEnum.metr2,
    provider: {
      id: 2,
    } as ProviderEntity,
  },
  {
    id: 5,
    title: 'Джинсы',
    image: '/jeans.jpg',
    total: 45,
    cost: 2590,
    // units: unit.find((u) => u.name === 'м2'),
    type: MaterialTypeEnum.metr2,
    provider: {
      id: 1,
    } as ProviderEntity,
  },
  {
    id: 6,
    title: 'Синтетика',
    image: '/синтетика.jpg',
    total: 45,
    cost: 1490,
    // units: unit.find((u) => u.name === 'м2'),
    type: MaterialTypeEnum.metr2,
    provider: {
      id: 2,
    } as ProviderEntity,
  },
  {
    id: 7,
    title: 'Пуговицы и молнии',
    // material: 'Металл',
    image: '/pugov.jpg',
    total: 45,
    cost: 500,
    // units: unit.find((u) => u.name === 'шт'),
    type: MaterialTypeEnum.piece,
    provider: {
      id: 2,
    } as ProviderEntity,
  },
  {
    id: 8,
    title: 'Шерсть',
    image: '/шерсть.jpg',
    total: 45,
    cost: 3090,
    // units: unit.find((u) => u.name === 'м2'),
    type: MaterialTypeEnum.metr2,
    provider: {
      id: 1,
    } as ProviderEntity,
  },
];
