import { BaseService } from '@/common/base/BaseService';
import { CategoryEntity } from '@/database/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RoleEnum } from '@/interfaces/enums';
// const console = new Logger('CategoryService');

@Injectable()
export class CategoryService extends BaseService<
  CategoryEntity,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(
    @InjectRepository(CategoryEntity)
    protected repo: Repository<CategoryEntity>,
  ) {
    super();
  }
}
