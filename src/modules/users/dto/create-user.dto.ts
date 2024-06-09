import { PartialType } from '@nestjs/swagger';
import { UserEntity } from '@/database/entities/user.entity';

export class CreateUserDto extends PartialType(UserEntity) {}
