import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  login: string;

  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  password: string;

  // @IsString()
  // @ApiPropertyOptional()
  // name: string; // Add name property if it's optional
}
