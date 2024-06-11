import { Entity, Column, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseModel } from '@/common/base/BaseModel';
import { IProduct } from '@/interfaces/entities';
import { CategoryEntity } from './category.entity';

@Entity('products')
export class ProductEntity extends BaseModel implements IProduct {
  @ApiProperty({ description: 'Category of the product' })
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn()
  category: Relation<CategoryEntity>;

  @ApiProperty({ description: 'Date when the order was placed' })
  @Column({ type: 'date', nullable: false })
  orderDate: Date;

  @ApiProperty({ description: 'Date when the product was received' })
  @Column({ type: 'date', nullable: false })
  receptionDate: Date;

  @ApiProperty({ description: 'Quantity of the products ordered' })
  @Column({ type: 'int', nullable: false })
  amount: number;

  @ApiProperty({ description: 'Total money spent on the products' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  money: number;

  // @ManyToOne(() => ProviderEntity, (provider) => provider.products, {
  //   eager: true,
  // })
  // @JoinColumn()
  // @ApiProperty({ type: () => ProviderEntity })
  // provider: ProviderEntity;
}
