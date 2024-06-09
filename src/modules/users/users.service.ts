import { BaseService } from '@/common/base/BaseService';
import { UserEntity } from '@/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RoleEnum } from '@/interfaces/enums';
// const console = new Logger('UserService');

@Injectable()
export class UserService extends BaseService<
  UserEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(UserEntity) protected repo: Repository<UserEntity>,
  ) {
    super();
  }

  // async findAllTeacher() {

  // }

  async findByLogin(login: string): Promise<UserEntity> {
    const candidate = await super.findOne({
      where: { login },
    });
    return candidate;
  }

  // async search(pagination: any, filter: any, search: any): Promise<any> {
  //   const queryBuilder = this.repo.createQueryBuilder('user');

  //   let page = 1;
  //   let pageSize = 10;
  //   if (pagination && typeof pagination === 'object') {
  //     page = parseInt(pagination.page, 10) || 1;
  //     pageSize = parseInt(pagination.pageSize, 10) || 10;
  //   }

  //   queryBuilder
  //     .leftJoinAndSelect('user.school', 'school')
  //     .leftJoinAndSelect('user.contacts', 'contacts')
  //     .leftJoinAndSelect('school.country', 'country')
  //     .where('user.role = :role', {
  //       role: RoleEnum.USER,
  //     });

  //   if (filter?.countryId) {
  //     queryBuilder.andWhere('country.id = :countryId', {
  //       countryId: filter.countryId,
  //     });
  //   }

  //   if (filter?.schoolId) {
  //     queryBuilder.andWhere('school.id = :schoolId', {
  //       schoolId: filter.schoolId,
  //     });
  //   }

  //   if (search) {
  //     Object.entries(search).forEach(([key, value]) => {
  //       const stringValue = typeof value === 'string' ? value : String(value);
  //       queryBuilder.orWhere(`LOWER(user.${key}) LIKE LOWER(:value)`, {
  //         value: `%${stringValue}%`,
  //       });
  //     });
  //   }

  //   const offset = (page - 1) * pageSize;
  //   queryBuilder.skip(offset).take(pageSize);
  //   queryBuilder.loadRelationCountAndMap(
  //     'user.classRoomCount',
  //     'user.classRooms',
  //   );
  //   const [records, total] = await queryBuilder.getManyAndCount();
  //   const meta = this.createMeta(page, pageSize, total);
  //   return {
  //     records,
  //     meta,
  //   };
  // }
  // Then I may need to
  // async findStudentsByTeacherId(adminId: string): Promise<any> {
  //   const result = await this.repo
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.enrollments', 'enrollment')
  //     .leftJoinAndSelect('enrollment.class_room', 'classRoom')
  //     .leftJoinAndSelect('enrollment.student', 'student')
  //     .leftJoinAndSelect('classRoom.admin', 'admin')
  //     .where('admin.id = :adminId', { adminId })
  //     // .select('user.id', 'studentId')
  //     // .addSelect('user.name', 'studentName')
  //     // .groupBy('user.id')
  //     // .addGroupBy('user.name')
  //     // .addSelect('COUNT(DISTINCT classRoom.id)', 'classroomCount')
  //     .getRawMany();

  //   return result;
  // }
}
