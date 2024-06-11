import { PartialType } from '@nestjs/swagger';
import { HuetaEntity } from '@/database/entities/hueta.entity';

export class CreateHuetaDto extends PartialType(HuetaEntity) {}
