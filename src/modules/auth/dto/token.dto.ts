import { UserEntity } from '@/database/entities/user.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class TokenLogin {
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  accessToken: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  user: Partial<UserEntity>;
}

export class TokenRegistration {
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  accessToken: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  user: Partial<UserEntity>;
}
