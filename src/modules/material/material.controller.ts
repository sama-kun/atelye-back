import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { BaseController } from '@/common/base/BaseController';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialEntity } from '@/database/entities/Material.entity';
import { SearchMaterialDto } from './dto/search-material.dto';
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

@ApiTags('Material')
@Controller('material')
@ApiBearerAuth()
export class MaterialController extends BaseController<
  MaterialEntity,
  CreateMaterialDto,
  UpdateMaterialDto,
  SearchMaterialDto,
  MaterialService
> {
  constructor(private MaterialService: MaterialService) {
    super();
    this.dataService = MaterialService;
  }

  @ApiOperation({ summary: 'Get all Countriess using query' })
  @ApiQuery({ type: SearchMaterialDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get('deleted')
  findAllDeleted(@Query() query: SearchMaterialDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.dataService.findAllDeleted(
      pagination,
      sort,
      relations,
      filter,
      search,
    );
  }

  @ApiOperation({ summary: 'Create Category' })
  @ApiResponse({
    status: 201,
    type: MaterialEntity,
    description: 'Material created successfully',
  })
  @ApiBody({ type: MaterialEntity })
  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async create(@Body() data: MaterialEntity) {
    return this.dataService.create(data);
  }

  @ApiOperation({ summary: 'Update Material' })
  @ApiResponse({
    status: 201,
    type: MaterialEntity,
    description: 'Material updated successfully',
  })
  @ApiParam({ name: 'id', description: 'Material ID' })
  @ApiBody({ type: MaterialEntity })
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  update(
    @AuthUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.dataService.update(id, updateMaterialDto);
  }

  @ApiOperation({ summary: 'Get all Materials using query' })
  @ApiQuery({ type: SearchMaterialDto })
  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async findAll(@Query() query: SearchMaterialDto) {
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

  @ApiParam({ name: 'id', description: 'Material ID' })
  @ApiOperation({ summary: 'Get Material by id' })
  @ApiResponse({
    status: 201,
    type: MaterialEntity,
  })
  @ApiQuery({ type: RelationQueryDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SearchMaterialDto,
  ) {
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
  // @Roles(RoleEnum.Material)
  // findAllTeacher(@AuthMaterial() Material: MaterialEntity) {
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
