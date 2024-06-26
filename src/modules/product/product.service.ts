import { BaseService } from '@/common/base/BaseService';
import { ProductEntity } from '@/database/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RoleEnum } from '@/interfaces/enums';
// const console = new Logger('ProductService');

@Injectable()
export class ProductService extends BaseService<
  ProductEntity,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    @InjectRepository(ProductEntity)
    protected repo: Repository<ProductEntity>,
  ) {
    super();
  }
}
