import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseModel } from '@/common/base/BaseModel';
import { MaterialEntity } from './material.entity'; // Предполагаем, что файл называется MaterialEntity.ts
import { ICategory } from '@/interfaces/entities';

@Entity('categories')
export class CategoryEntity extends BaseModel implements ICategory {
  @ApiProperty({ description: 'Name of the category' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => MaterialEntity, (material) => material.categories, {
    cascade: true,
  })
  @JoinColumn()
  @ApiProperty({ type: () => MaterialEntity })
  material: MaterialEntity;
}
