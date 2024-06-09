import { PartialType } from '@nestjs/swagger';
import { PositionEntity } from '@/database/entities/position.entity';

export class CreatePositionDto extends PartialType(PositionEntity) {}
