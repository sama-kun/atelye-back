import { CreatePositionDto } from './create-position.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {}
