import { PartialType } from '@nestjs/swagger';
import { MaterialEntity } from '@/database/entities/material.entity';

export class CreateMaterialDto extends PartialType(MaterialEntity) {}
