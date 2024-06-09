import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BaseModel } from '@/common/base/BaseModel';
import { UserPositionEnum, UserRankEnum } from '@/interfaces/enums'; // Предполагаем, что enum'ы определены в отдельном файле
import { UserEntity } from './user.entity';

@Entity('positions')
export class PositionEntity extends BaseModel {
  @ApiProperty({
    enum: UserPositionEnum,
    description: 'Current position of the user',
  })
  @Column({
    type: 'enum',
    enum: UserPositionEnum,
    default: UserPositionEnum.cashier,
  })
  value: UserPositionEnum;

  @ApiProperty({
    enum: UserRankEnum,
    description: "Rank associated with the user's position",
  })
  @Column({ type: 'enum', enum: UserRankEnum, default: UserRankEnum.junior })
  rank: UserRankEnum;

  @ApiPropertyOptional({
    type: Date,
    description: 'End date of the position if applicable',
  })
  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @ManyToOne(() => UserEntity, (user) => user.positions)
  user: UserEntity;
}
