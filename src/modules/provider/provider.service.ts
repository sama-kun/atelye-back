import { BaseService } from '@/common/base/BaseService';
import { ProviderEntity } from '@/database/entities/provider.entity';
import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RoleEnum } from '@/interfaces/enums';
// const console = new Logger('ProviderService');

@Injectable()
export class ProviderService extends BaseService<
  ProviderEntity,
  CreateProviderDto,
  UpdateProviderDto
> {
  constructor(
    @InjectRepository(ProviderEntity)
    protected repo: Repository<ProviderEntity>,
  ) {
    super();
  }
}
