import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenLogin } from './dto/token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '@/database/entities/user.entity';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RoleEnum } from '@/interfaces/enums';

@Injectable()
export class AuthService {
  private readonly console = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getHash(password: string) {
    // const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, process.env.SALT);
    return { hash };
  }

  async changePassword(
    data: ResetPasswordDto,
    user: UserEntity,
  ): Promise<UserEntity> {
    const candidate = await this.userService.findByLogin(user.login);
    // const currentCheck = await bcrypt.compare(
    //   data.currentPassword,
    //   candidate.password,
    // );

    const confirmCheck = data.password == data.passwordConfirm;

    if (confirmCheck) {
      const hash = await bcrypt.hash(data.password, process.env.SALT);
      const updatedUser = await this.userService.update(candidate.id, {
        password: hash,
      });
      delete updatedUser.password;

      return updatedUser;
    } else
      throw new HttpException(
        'Something went wrong when reset password of user',
        HttpStatus.BAD_REQUEST,
      );
  }

  // async registrationTeacher(data: UserEntity): Promise<UserEntity> {
  //   data.password = await bcrypt.hash(data.accountId, 5);
  //   const user = await this.userService.create(data);
  //   delete user.password;
  //   return user;
  // }

  async login(dto: LoginUserDto): Promise<TokenLogin> {
    const user = await this.validateUser(dto);
    delete user.password;
    return {
      accessToken: this.generateToken(user),
      user,
    };
  }

  async registration(dto: RegistrationUserDto): Promise<any> {
    const candidate = await this.userService.findByLogin(dto.login);
    if (candidate) {
      throw new HttpException(
        'AccountId already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hash = await bcrypt.hash(dto.password, process.env.SALT);
    const user = await this.userService.create({
      ...dto,
      password: hash,
    } as CreateUserDto);
    delete user.password;
    return {
      accessToken: this.generateToken(user),
      user,
    };
  }

  private generateToken(user: UserEntity): string {
    const payload = { login: user.login, id: user.id, role: user.role };
    console.log(user);
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: LoginUserDto): Promise<UserEntity> {
    // console.log(userDto);
    try {
      const user = await this.userService.findByLogin(userDto.login);
      const passwordCheck = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (passwordCheck && user) {
        return user;
      }
      throw new UnauthorizedException({
        message: 'Incorrect password or account',
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: 'Incorrect password or account',
      });
    }
  }
}
