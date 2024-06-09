import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class RegistrationUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @Length(6, 12)
  @IsString()
  @ApiPropertyOptional()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  @Length(6, 50)
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  @Length(6, 50)
  passwordConfirm: string;

  @ApiProperty()
  @IsString()
  name: string; // Add name property if it's optional

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('KZ')
  @ApiProperty()
  @IsString()
  phone: string;
}
