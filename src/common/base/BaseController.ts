import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { BaseService } from './BaseService';
import { SearchQueryDto } from './dto/search-query.dto';
import { ObjectLiteral } from 'typeorm';
import { BaseModel } from './BaseModel';
import { AuthUser } from '../decorators/auth-user.decorator';
import { UserEntity } from '@/database/entities/user.entity';
import { RelationQueryDto } from './dto/relations-query.dto';
@Controller()
export abstract class BaseController<
  Entity extends BaseModel & ObjectLiteral,
  CreateDto extends Partial<Entity>,
  UpdateDto extends Partial<Entity>,
  SearchDto extends Partial<Entity & SearchQueryDto>,
  DataService extends Partial<BaseService<Entity, CreateDto, UpdateDto>>,
> {
  public dataService: DataService;

  @Post()
  create(@Body() data: CreateDto) {
    return this.dataService.create(data);
  }

  @Get('deleted')
  findAllDeleted(@Query() query: SearchDto) {
    const { sort, relations, filter, search, dateFilter } = query;
    console.log(dateFilter);
    return this.dataService.findAllDeleted(
      sort,
      relations,
      filter,
      search,
      dateFilter,
    );
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: RelationQueryDto,
  ) {
    const { relations } = query;
    return this.dataService.findById(id, relations);
  }

  @Patch(':id')
  update(
    @AuthUser() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDto,
  ) {
    return this.dataService.update(id, updateDto);
  }

  @Get()
  findAll(@Query() query: SearchDto) {
    const { sort, relations, filter, search, dateFilter } = query;
    console.log(dateFilter);
    return this.dataService.findAll(
      sort,
      relations,
      filter,
      search,
      dateFilter,
    );
  }

  @Delete(':id')
  delete(@AuthUser() user: UserEntity, @Param('id', ParseIntPipe) id: number) {
    return this.dataService.delete(user, id);
  }
}
