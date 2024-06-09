import { BaseService } from '@/common/base/BaseService';
import { PositionEntity } from '@/database/entities/position.entity';
import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RoleEnum } from '@/interfaces/enums';
// const console = new Logger('PositionService');

@Injectable()
export class PositionService extends BaseService<
  PositionEntity,
  CreatePositionDto,
  UpdatePositionDto
> {
  constructor(
    @InjectRepository(PositionEntity)
    protected repo: Repository<PositionEntity>,
  ) {
    super();
  }
}
