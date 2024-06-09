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
import { PositionService } from './position.service';
import { BaseController } from '@/common/base/BaseController';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionEntity } from '@/database/entities/position.entity';
import { SearchPositionDto } from './dto/search-position.dto';
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

@ApiTags('Position')
@Controller('position')
@ApiBearerAuth()
export class PositionController extends BaseController<
  PositionEntity,
  CreatePositionDto,
  UpdatePositionDto,
  SearchPositionDto,
  PositionService
> {
  constructor(private PositionService: PositionService) {
    super();
    this.dataService = PositionService;
  }

  @ApiOperation({ summary: 'Get all Countriess using query' })
  @ApiQuery({ type: SearchPositionDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get('deleted')
  findAllDeleted(@Query() query: SearchPositionDto) {
    const { pagination, sort, relations, filter, search } = query;
    return this.dataService.findAllDeleted(
      pagination,
      sort,
      relations,
      filter,
      search,
    );
  }

  @ApiOperation({ summary: 'Create Position' })
  @ApiResponse({
    status: 201,
    type: PositionEntity,
    description: 'Position created successfully',
  })
  @ApiBody({ type: PositionEntity })
  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async create(@Body() data: PositionEntity) {
    return this.dataService.create(data);
  }

  @ApiOperation({ summary: 'Update Position' })
  @ApiResponse({
    status: 201,
    type: PositionEntity,
    description: 'Position updated successfully',
  })
  @ApiParam({ name: 'id', description: 'Position ID' })
  @ApiBody({ type: PositionEntity })
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  update(
    @AuthUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.dataService.update(id, updatePositionDto);
  }

  @ApiOperation({ summary: 'Get all Positions using query' })
  @ApiQuery({ type: SearchPositionDto })
  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async findAll(@Query() query: SearchPositionDto) {
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

  @ApiParam({ name: 'id', description: 'Position ID' })
  @ApiOperation({ summary: 'Get Position by id' })
  @ApiResponse({
    status: 201,
    type: PositionEntity,
  })
  @ApiQuery({ type: RelationQueryDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SearchPositionDto,
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
  // @Roles(RoleEnum.Position)
  // findAllTeacher(@AuthPosition() Position: PositionEntity) {
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
