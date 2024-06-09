import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  // @IsNotEmpty()
  // @IsString()
  // @ApiPropertyOptional()
  // currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  @ApiPropertyOptional()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  @ApiPropertyOptional()
  passwordConfirm: string;
}
