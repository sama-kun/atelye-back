import { BaseService } from '@/common/base/BaseService';
import { MaterialEntity } from '@/database/entities/material.entity';
import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { RoleEnum } from '@/interfaces/enums';
// const console = new Logger('MaterialService');

@Injectable()
export class MaterialService extends BaseService<
  MaterialEntity,
  CreateMaterialDto,
  UpdateMaterialDto
> {
  constructor(
    @InjectRepository(MaterialEntity)
    protected repo: Repository<MaterialEntity>,
  ) {
    super();
  }
}
