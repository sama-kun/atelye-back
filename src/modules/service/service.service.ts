import { BaseService } from '@/common/base/BaseService';
import { ServiceEntity } from '@/database/entities/service.entity';
import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RoleEnum } from '@/interfaces/enums';
// const console = new Logger('ServiceService');

@Injectable()
export class ServiceService extends BaseService<
  ServiceEntity,
  CreateServiceDto,
  UpdateServiceDto
> {
  constructor(
    @InjectRepository(ServiceEntity)
    protected repo: Repository<ServiceEntity>,
  ) {
    super();
  }
}
