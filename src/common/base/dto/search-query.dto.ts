import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

class Pagination {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @ApiPropertyOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @ApiPropertyOptional()
  pageSize?: number;
}

export class SearchQueryDto {
  @ApiPropertyOptional({ type: Pagination })
  pagination?: Pagination;

  @ApiPropertyOptional()
  sort?: Record<string, any>;

  @ApiPropertyOptional()
  search?: Record<string, any>;

  @ApiPropertyOptional()
  filter?: Record<string, any>;

  @ApiPropertyOptional({
    type: Array,
    description: 'Relations to load',
  })
  relations?: string;
}
