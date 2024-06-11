import { ProviderEntity } from '../entities/provider.entity';

export const providers: Partial<ProviderEntity>[] = [
  {
    id: 1,
    company: 'Atlas',
    email: 'atlas@gmail.com',
    address: 'Satbaeva 29a',
    fio: 'Kairat Nurtas',
    phone: '87082348234',
    date: new Date('2024-03-24'),
  },
  {
    id: 2,
    company: 'Express Next',
    email: 'express@gmail.com',
    address: 'Gagarina 29a',
    fio: 'Aikyn Tolepbergen',
    phone: '87082348235',
    date: new Date('2024-03-20'),
  },
];
