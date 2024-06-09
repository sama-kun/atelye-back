import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@/modules/auth/dto/login-user.dto';
import { TokenLogin, TokenRegistration } from './dto/token.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '@/database/entities/user.entity';
import { Roles } from '@/common/decorators/roles-auth.decorator';
import { RoleEnum } from '@/interfaces/enums';
import { RolesGuard } from '@/common/guards/roles.guard';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
// import { EmailService } from 'src/email/email.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/hash')
  async generateHash(@Body() data: any) {
    return this.authService.getHash(data.password);
  }

  // first-login-password-reset
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: 201,
    type: ResetPasswordDto,
    description: 'Reset password',
  })
  @ApiBody({ type: ResetPasswordDto })
  @Post('/change-password')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.USER)
  resetPassword(@Body() data: ResetPasswordDto, @AuthUser() user: UserEntity) {
    return this.authService.changePassword(data, user);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    type: TokenLogin,
    description: 'Login',
  })
  @ApiBody({ type: LoginUserDto })
  @Post('/login')
  login(@Body() userDto: LoginUserDto): Promise<TokenLogin> {
    console.log(userDto);
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({
    status: 201,
    type: TokenRegistration,
    description: 'Registration done successfully',
  })
  @ApiBody({ type: RegistrationUserDto })
  @Post('/registration')
  registration(
    @Body() userDto: RegistrationUserDto,
  ): Promise<TokenRegistration> {
    if (userDto.password != userDto.passwordConfirm) {
      throw new HttpException(
        'password and confirm not same',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(userDto);
    return this.authService.registration(userDto);
  }

  // @Post('/sendcode')
  // sendCode(@Body() userDto: Prisma.UserCreateInput) {
  //   return this.emailService.sendMessage(userDto);
  // }
}
