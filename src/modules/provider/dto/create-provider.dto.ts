import { PartialType } from '@nestjs/swagger';
import { ProviderEntity } from '@/database/entities/provider.entity';

export class CreateProviderDto extends PartialType(ProviderEntity) {}
