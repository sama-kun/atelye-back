import { RoleEnum } from '@/interfaces/enums';
import { UserEntity } from '../entities/user.entity';

export const users: Partial<UserEntity>[] = [
  {
    login: 'admin',
    name: 'Admin',
    surname: 'Admin',
    password: '$2a$10$KjIAuVGI7oAdfCbSW5QlM.AQ1Y8bTVX5NfkQFZjcS441iWKZId6De',
    role: RoleEnum.ADMIN,
  },
  {
    login: 'root',
    name: 'Root',
    surname: 'Root',
    password: '$2a$10$KjIAuVGI7oAdfCbSW5QlM.dbBC3HKHVRL9LVsEJZGc8IltFiXOn1K',
    role: RoleEnum.ROOT,
  },
  {
    login: 'manager',
    name: 'Manager',
    surname: 'Manager',
    password: '$2a$10$KjIAuVGI7oAdfCbSW5QlM.AQ1Y8bTVX5NfkQFZjcS441iWKZId6De',
    role: RoleEnum.USER,
  },
  {
    login: 'user',
    name: 'User',
    surname: 'User Surname',
    password: '$2a$10$KjIAuVGI7oAdfCbSW5QlM.AQ1Y8bTVX5NfkQFZjcS441iWKZId6De',
    role: RoleEnum.USER,
  },
  {
    login: 'user1',
    name: 'User',
    surname: 'User',
    password: '$2a$10$KjIAuVGI7oAdfCbSW5QlM.AQ1Y8bTVX5NfkQFZjcS441iWKZId6De',
    role: RoleEnum.USER,
  },
];
