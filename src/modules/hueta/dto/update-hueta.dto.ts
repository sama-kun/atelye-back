import { CreateHuetaDto } from './create-hueta.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateHuetaDto extends PartialType(CreateHuetaDto) {}
