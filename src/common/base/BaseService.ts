import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseModel } from './BaseModel';
import {
  Like,
  ObjectLiteral,
  Repository,
  TypeORMError,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { UserEntity } from '@/database/entities/user.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
const console = new Logger('BaseService');
export abstract class BaseService<
  Entity extends BaseModel & ObjectLiteral,
  CreateDto extends Partial<Entity>,
  UpdateDto extends Partial<Entity>,
> {
  protected repo: Repository<Entity>;

  async create(data: CreateDto) {
    try {
      // let id: string = null;
      // if (user) {
      //   id = user.id;
      // }
      const record = await this.repo.insert({
        ...data,
        // createdBy: { id },
      } as QueryDeepPartialEntity<Entity>);
      return this.findById(record.raw[0].id, '');
    } catch (e) {
      console.error(e);
      throw new TypeORMError(e);
    }
  }

  async findOne(option: any): Promise<Entity> {
    // option.relations = [...((option.relations as Array<string>) || [])];
    option.relations = option.relations.split(',');
    const record = this.repo.findOne(option);
    if (!record)
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    return record;
  }

  async findById(id: number, relations: string): Promise<Entity> {
    try {
      const relationsArray = relations.split(',');

      const option: any = {
        where: { id },
      };
      const record = await this.findOne({ ...option, relationsArray });
      if (!record)
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      return record;
    } catch (e) {
      console.error(e);
      throw new TypeORMError(e);
    }
  }

  async update(id: number, data: UpdateDto): Promise<Entity> {
    const record = await this.findById(id, '');
    // let userId: string = null;
    // if (user) {
    //   userId = user.id;
    // }
    Object.assign(record, {
      ...data,
      updated_at: new Date(),
    });
    try {
      return await this.repo.save(record);
    } catch (e) {
      console.error(e);
      throw new TypeORMError(e);
    }
  }

  async findAll(
    pagination: any,
    sort: any,
    relations: string,
    filter: any,
    search: any,
  ): Promise<any> {
    let page = 1;
    let pageSize = 10;
    if (pagination && typeof pagination === 'object') {
      page = parseInt(pagination.page, 10) || 1;
      pageSize = parseInt(pagination.pageSize, 10) || 10;
    }

    const relationsArray = relations.split(',');

    const whereConditions: FindOptionsWhere<any> = { ...filter };

    if (search) {
      Object.entries(search).forEach(([key, value]) => {
        if (typeof value === 'string') {
          // Убедитесь, что значение является строкой
          whereConditions[key] = ILike(`%${value}%`); // Используйте ILIKE для поиска без учета регистра в PostgreSQL
        }
      });
    }

    try {
      const [records, total] = await this.repo.findAndCount({
        order: sort,
        relations: relationsArray,
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: whereConditions,
      });

      const meta = this.createMeta(page, pageSize, total);

      return {
        records,
        meta,
      };
    } catch (error) {
      console.error(error);
      throw new TypeORMError(error);
    }
  }

  async findAllDeleted(
    pagination: any,
    sort: any,
    relations: string,
    filter: any,
    search: any,
    // dateFilter?: { startDate: Date; endDate: Date },
  ): Promise<any> {
    let convertedSearch = null;
    let page = 1;
    let pageSize = 10;
    console.log(pagination);
    if (search) {
      const key = Object.keys(search)[0];
      const obj = search[key];
      convertedSearch = { [key]: Like(`%${obj}%`) };
    }

    const relationsArray = relations.split(',');

    if (pagination && typeof pagination === 'object') {
      page = parseInt(pagination.page, 10) || 1;
      pageSize = parseInt(pagination.pageSize, 10) || 10;
    }

    // let dateConditions = {};
    // if (dateFilter && dateFilter.startDate && dateFilter.endDate) {
    //   const endDate = new Date(dateFilter.endDate);
    //   endDate.setDate(endDate.getDate() + 1);
    //   dateConditions = {
    //     createdAt: Between(new Date(dateFilter.startDate), endDate), // Или updatedAt, в зависимости от того, что вам нужно
    //   };
    // }

    const total = await this.repo.find({
      withDeleted: true,
      order: sort,
      // relationArray,
      where: {
        is_deleted: true,
        ...filter,
        ...convertedSearch,
        // ...dateConditions,
      },
    });

    try {
      const records = await this.repo.find({
        withDeleted: true,
        order: sort,
        // relationsArray,
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          is_deleted: true,
          ...filter,
          ...convertedSearch,
          // ...dateConditions,
        },
      });

      const meta = this.createMeta(page, pageSize, total.length);

      return {
        records,
        meta,
      };
    } catch (error) {
      console.error(error);
      throw new TypeORMError(error);
    }
  }

  createMeta(page: number, pageSize: number, total: number) {
    const meta = {
      page,
      pageSize,
      pageCount: Math.ceil(total / pageSize),
      total,
    };
    return meta;
  }

  async delete(user: UserEntity, id: string): Promise<any> {
    const candidate = await this.findOne({
      where: {
        id,
      },
    });

    candidate.deletedAt = new Date();
    candidate.isDeleted = true;
    const test = await this.repo.save(candidate);
    return test;
  }
}
