import { Module, forwardRef } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@/database/entities/category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    // MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])
    TypeOrmModule.forFeature([CategoryEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
