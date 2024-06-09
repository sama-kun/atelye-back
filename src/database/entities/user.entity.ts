import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BaseModel } from '@/common/base/BaseModel';
import { OrderEntity } from './order.entity'; // Предполагаем, что файл называется OrderEntity.ts
import { RoleEnum, UserGenderEnum } from '@/interfaces/enums';
import { IUser } from '@/interfaces/entities';
import { PositionEntity } from './position.entity';

@Entity('users')
export class UserEntity extends BaseModel implements IUser {
  @ApiProperty({ description: 'Unique user login identifier', maxLength: 12 })
  @Column({ nullable: false, unique: true, length: 12 })
  login: string;

  @ApiPropertyOptional({ description: 'User password (encrypted)' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    enum: RoleEnum,
    description: 'User role in the system',
    default: RoleEnum.USER,
  })
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @ApiProperty({ maxLength: 32 })
  @Column({ length: 32, nullable: false })
  name: string;

  @ApiPropertyOptional({ maxLength: 32 })
  @Column({ length: 32, nullable: false })
  surname: string;

  @ApiPropertyOptional({ description: "URL to the user's avatar image" })
  @Column({ nullable: true })
  avatar: string;

  @ApiPropertyOptional({ enum: UserGenderEnum, description: "User's gender" })
  @Column({
    type: 'enum',
    enum: UserGenderEnum,
    nullable: true,
    default: UserGenderEnum.male,
  })
  gender: UserGenderEnum;

  @ApiPropertyOptional({ maxLength: 50 })
  @Column({ length: 50, nullable: true })
  email: string;

  @ApiPropertyOptional({ maxLength: 15 })
  @Column({ length: 15, nullable: true })
  phone: string;

  @ApiPropertyOptional({ type: Date, description: "User's birthdate" })
  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @OneToMany(() => OrderEntity, (order) => order.employee)
  @ApiPropertyOptional({ type: () => OrderEntity, isArray: true })
  orders: OrderEntity[];

  @OneToMany(() => PositionEntity, (pos) => pos.user, { nullable: true })
  @ApiPropertyOptional({ type: () => PositionEntity, isArray: true })
  positions: PositionEntity[];
}
