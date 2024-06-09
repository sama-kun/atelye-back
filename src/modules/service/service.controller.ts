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
import { ServiceService } from './service.service';
import { BaseController } from '@/common/base/BaseController';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceEntity } from '@/database/entities/service.entity';
import { SearchServiceDto } from './dto/search-service.dto';
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

@ApiTags('Service')
@Controller('service')
@ApiBearerAuth()
export class ServiceController extends BaseController<
  ServiceEntity,
  CreateServiceDto,
  UpdateServiceDto,
  SearchServiceDto,
  ServiceService
> {
  constructor(private ServiceService: ServiceService) {
    super();
    this.dataService = ServiceService;
  }

  @ApiOperation({ summary: 'Get all Countriess using query' })
  @ApiQuery({ type: SearchServiceDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get('deleted')
  findAllDeleted(@Query() query: SearchServiceDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.dataService.findAllDeleted(
      pagination,
      sort,
      relations,
      filter,
      search,
    );
  }

  @ApiOperation({ summary: 'Create Service' })
  @ApiResponse({
    status: 201,
    type: ServiceEntity,
    description: 'Service created successfully',
  })
  @ApiBody({ type: ServiceEntity })
  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async create(@Body() data: ServiceEntity) {
    return this.dataService.create(data);
  }

  @ApiOperation({ summary: 'Update Service' })
  @ApiResponse({
    status: 201,
    type: ServiceEntity,
    description: 'Service updated successfully',
  })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiBody({ type: ServiceEntity })
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  update(
    @AuthUser() user: UserEntity,
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.dataService.update(id, updateServiceDto);
  }

  @ApiOperation({ summary: 'Get all Services using query' })
  @ApiQuery({ type: SearchServiceDto })
  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async findAll(@Query() query: SearchServiceDto) {
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

  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiOperation({ summary: 'Get Service by id' })
  @ApiResponse({
    status: 201,
    type: ServiceEntity,
  })
  @ApiQuery({ type: RelationQueryDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('/:id')
  async getOne(@Param('id') id: number, @Query() query: SearchServiceDto) {
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
  // @Roles(RoleEnum.Service)
  // findAllTeacher(@AuthService() Service: ServiceEntity) {
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
