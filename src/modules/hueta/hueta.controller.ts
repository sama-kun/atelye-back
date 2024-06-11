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
import { HuetaService } from './hueta.service';
import { BaseController } from '@/common/base/BaseController';
import { CreateHuetaDto } from './dto/create-hueta.dto';
import { UpdateHuetaDto } from './dto/update-hueta.dto';
import { HuetaEntity } from '@/database/entities/hueta.entity';
import { SearchHuetaDto } from './dto/search-hueta.dto';
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

@ApiTags('Hueta')
@Controller('hueta')
@ApiBearerAuth()
export class HuetaController extends BaseController<
  HuetaEntity,
  CreateHuetaDto,
  UpdateHuetaDto,
  SearchHuetaDto,
  HuetaService
> {
  constructor(private HuetaService: HuetaService) {
    super();
    this.dataService = HuetaService;
  }

  @ApiOperation({ summary: 'Get all Countriess using query' })
  @ApiQuery({ type: SearchHuetaDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get('deleted')
  findAllDeleted(@Query() query: SearchHuetaDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.dataService.findAllDeleted(
      pagination,
      sort,
      relations,
      filter,
      search,
    );
  }

  @ApiOperation({ summary: 'Create Hueta' })
  @ApiResponse({
    status: 201,
    type: HuetaEntity,
    description: 'Hueta created successfully',
  })
  @ApiBody({ type: HuetaEntity })
  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async create(@Body() data: HuetaEntity) {
    return this.dataService.create(data);
  }

  @ApiOperation({ summary: 'Update Hueta' })
  @ApiResponse({
    status: 201,
    type: HuetaEntity,
    description: 'Hueta updated successfully',
  })
  @ApiParam({ name: 'id', description: 'Hueta ID' })
  @ApiBody({ type: HuetaEntity })
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  update(
    @AuthUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHuetaDto: UpdateHuetaDto,
  ) {
    return this.dataService.update(id, updateHuetaDto);
  }

  @ApiOperation({ summary: 'Get all Huetas using query' })
  @ApiQuery({ type: SearchHuetaDto })
  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async findAll(@Query() query: SearchHuetaDto) {
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

  @ApiParam({ name: 'id', description: 'Hueta ID' })
  @ApiOperation({ summary: 'Get Hueta by id' })
  @ApiResponse({
    status: 201,
    type: HuetaEntity,
  })
  @ApiQuery({ type: RelationQueryDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SearchHuetaDto,
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
  // @Roles(RoleEnum.Hueta)
  // findAllTeacher(@AuthHueta() Hueta: HuetaEntity) {
  //   return this.dataService.search();
  // }

  @ApiParam({ name: 'id', description: 'ID' })
  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  delete(@AuthUser() user: UserEntity, @Param('id') id: number) {
    return this.dataService.delete(user, id);
  }
}
