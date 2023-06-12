import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/user/dto/user-create.dto';
import { IUserDetails } from 'src/user/interfaces/user-details.interface';
import { UserLoginDto } from 'src/user/dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(
    @Body() userCreateDto: UserCreateDto,
  ): Promise<IUserDetails | Error> {
    return this.authService.register(userCreateDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<{ access_token: string } | Error> {
    return this.authService.login(userLoginDto);
  }
}
