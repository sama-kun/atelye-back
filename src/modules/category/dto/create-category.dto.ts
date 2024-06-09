import { PartialType } from '@nestjs/swagger';
import { CategoryEntity } from '@/database/entities/category.entity';

export class CreateCategoryDto extends PartialType(CategoryEntity) {}
