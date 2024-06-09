import { CreateProviderDto } from './create-provider.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
