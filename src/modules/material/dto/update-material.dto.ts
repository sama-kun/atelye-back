import { CreateMaterialDto } from './create-material.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}
