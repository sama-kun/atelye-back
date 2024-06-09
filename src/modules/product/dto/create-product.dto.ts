import { PartialType } from '@nestjs/swagger';
import { ProductEntity } from '@/database/entities/product.entity';

export class CreateProductDto extends PartialType(ProductEntity) {}
