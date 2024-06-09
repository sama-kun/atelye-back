import { PartialType } from '@nestjs/swagger';
import { ServiceEntity } from '@/database/entities/service.entity';

export class CreateServiceDto extends PartialType(ServiceEntity) {}
