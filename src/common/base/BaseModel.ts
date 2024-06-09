// import { UserEntity } from '@/database/entities/user.entity';
import { IBaseModel } from '@/interfaces/entities';
import { IsBoolean, IsOptional } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

@Entity()
export abstract class BaseModel implements IBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  // @IsDate()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  // @IsOptional()
  createdAt?: Date;

  // @IsOptional()
  // @IsDate()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  // @IsOptional()
  // @IsDate()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @IsBoolean()
  @IsOptional()
  @Column({ default: false })
  isDeleted?: boolean;
}
