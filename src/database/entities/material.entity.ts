import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BaseModel } from '@/common/base/BaseModel';
import { CategoryEntity } from './category.entity'; // Предполагаем, что файл называется CategoryEntity.ts
import { MaterialTypeEnum } from '@/interfaces/enums'; // Предполагаем, что enum типов материалов также определён
import { IMaterial } from '@/interfaces/entities';

@Entity('materials')
export class MaterialEntity extends BaseModel implements IMaterial {
  @ApiProperty({ description: 'The title of the material' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @ApiProperty({ description: 'Cost of the material' })
  @Column({ nullable: false })
  cost: number;

  @ApiProperty({ enum: MaterialTypeEnum, description: 'Type of the material' })
  @Column({
    type: 'enum',
    enum: MaterialTypeEnum,
    default: MaterialTypeEnum.metr,
    nullable: false,
  })
  type: MaterialTypeEnum;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  image?: string;

  @OneToMany(() => CategoryEntity, (cate) => cate.material, { nullable: true })
  @ApiPropertyOptional({ type: () => CategoryEntity, isArray: true })
  categories?: CategoryEntity[];

  @ApiPropertyOptional()
  @Column({ nullable: true })
  total?: number;
}
