import { BaseService } from '@/common/base/BaseService';
import { HuetaEntity } from '@/database/entities/hueta.entity';
import { Injectable } from '@nestjs/common';
import { CreateHuetaDto } from './dto/create-hueta.dto';
import { UpdateHuetaDto } from './dto/update-hueta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RoleEnum } from '@/interfaces/enums';
// const console = new Logger('HuetaService');

@Injectable()
export class HuetaService extends BaseService<
  HuetaEntity,
  CreateHuetaDto,
  UpdateHuetaDto
> {
  constructor(
    @InjectRepository(HuetaEntity)
    protected repo: Repository<HuetaEntity>,
  ) {
    super();
  }
}
