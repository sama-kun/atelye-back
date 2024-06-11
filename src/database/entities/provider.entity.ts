import { Entity, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BaseModel } from '@/common/base/BaseModel';
import { IProvider } from '@/interfaces/entities';

@Entity('providers')
export class ProviderEntity extends BaseModel implements IProvider {
  @ApiProperty({ description: 'Name of the company' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  company: string;

  @ApiProperty({ description: 'Contact email of the provider' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @ApiProperty({ description: 'Address of the provider' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @ApiProperty({ description: "Full name of the provider's representative" })
  @Column({ type: 'varchar', length: 255, nullable: false })
  fio: string;

  @ApiPropertyOptional({ description: 'Contact phone number of the provider' })
  @Column({ type: 'varchar', length: 15, nullable: true })
  phone?: string;

  @ApiPropertyOptional({ description: 'Date when the provider was registered' })
  @Column({ type: 'date', nullable: true })
  date?: Date;

  @ApiPropertyOptional({ description: 'Business Identification Number (BIN)' })
  @Column({ type: 'varchar', length: 12, nullable: true })
  bin?: string;

  // @OneToMany(() => ProductEntity, (product) => product.provider)
  // @ApiPropertyOptional({
  //   type: () => ProductEntity,
  //   isArray: true,
  //   description: 'List of products provided by the provider',
  // })
  // products: ProductEntity[];
}
