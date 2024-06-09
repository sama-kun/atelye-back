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
import { UserService } from './users.service';
import { BaseController } from '@/common/base/BaseController';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '@/database/entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';
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

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController extends BaseController<
  UserEntity,
  CreateUserDto,
  UpdateUserDto,
  SearchUserDto,
  UserService
> {
  constructor(private userService: UserService) {
    super();
    this.dataService = userService;
  }

  @ApiOperation({ summary: 'Get all Countriess using query' })
  @ApiQuery({ type: SearchUserDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get('deleted')
  findAllDeleted(@Query() query: SearchUserDto) {
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
    type: UserEntity,
    description: 'User created successfully',
  })
  @ApiBody({ type: UserEntity })
  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async create(@Body() data: UserEntity) {
    return this.dataService.create(data);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 201,
    type: UserEntity,
    description: 'User updated successfully',
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UserEntity })
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  update(
    @AuthUser() user: UserEntity,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.dataService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Get all Users using query' })
  @ApiQuery({ type: SearchUserDto })
  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  async findAll(@Query() query: SearchUserDto) {
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

  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({ summary: 'Get User by id' })
  @ApiResponse({
    status: 201,
    type: UserEntity,
  })
  @ApiQuery({ type: RelationQueryDto })
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('/:id')
  async getOne(@Param('id') id: number, @Query() query: SearchUserDto) {
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
  // @Roles(RoleEnum.USER)
  // findAllTeacher(@AuthUser() user: UserEntity) {
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
