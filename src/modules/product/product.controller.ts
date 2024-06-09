import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { BaseController } from '@/common/base/BaseController';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from '@/database/entities/product.entity';
import { SearchProductDto } from './dto/search-product.dto';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleEnum } from '@/interfaces/enums';
import { Roles } from '@/common/decorators/roles-auth.decorator';
import { RelationQueryDto } from '@/common/base/dto/relations-query.dto';
import { UserEntity } from '@/database/entities/user.entity';

@ApiTags('Product')
@Controller('product')
@ApiBearerAuth()
export class ProductController extends BaseController<
  ProductEntity,
  CreateProductDto,
  UpdateProductDto,
  SearchProductDto,
  ProductService
> {
  constructor(private ProductService: ProductService) {
    super();
    this.dataService = ProductService;
  }

  @ApiOperation({ summary: 'Get all Countriess using query' })
  @ApiQuery({ type: SearchProductDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get('deleted')
  findAllDeleted(@Query() query: SearchProductDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.dataService.findAllDeleted(
      pagination,
      sort,
      relations,
      filter,
      search,
    );
  }

  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({
    status: 201,
    type: ProductEntity,
    description: 'Product created successfully',
  })
  @ApiBody({ type: ProductEntity })
  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async create(@Body() data: ProductEntity) {
    return this.dataService.create(data);
  }

  @ApiOperation({ summary: 'Update Product' })
  @ApiResponse({
    status: 201,
    type: ProductEntity,
    description: 'Product updated successfully',
  })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: ProductEntity })
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  update(
    @AuthUser() user: UserEntity,
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.dataService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Get all Products using query' })
  @ApiQuery({ type: SearchProductDto })
  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async findAll(@Query() query: SearchProductDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.dataService.findAll(
      pagination,
      sort,
      relations,
      filter,
      search,
      // dateFilter,
    );
  }

  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiOperation({ summary: 'Get Product by id' })
  @ApiResponse({
    status: 201,
    type: ProductEntity,
  })
  @ApiQuery({ type: RelationQueryDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('/:id')
  async getOne(@Param('id') id: number, @Query() query: SearchProductDto) {
    const { relations } = query;
    return this.dataService.findById(id, relations);
  }

  @Get('auth/me')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  me(@AuthUser() user: UserEntity) {
    if (!user)
      throw new HttpException('Токен неверный', HttpStatus.UNAUTHORIZED);
    return this.dataService.findOne({
      where: { id: user.id },
      relations: [],
    });
  }

  // @Get('/teacher')
  // @ApiBearerAuth()
  // @UseGuards(RolesGuard)
  // @Roles(RoleEnum.Product)
  // findAllTeacher(@AuthProduct() Product: ProductEntity) {
  //   return this.dataService.search();
  // }

  @ApiParam({ name: 'id', description: 'ID' })
  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  delete(@AuthUser() user: UserEntity, @Param('id') id: string) {
    return this.dataService.delete(user, id);
  }
}
