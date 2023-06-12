import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from 'src/user/dto/user-create.dto';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { IUserDetails } from 'src/user/interfaces/user-details.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: UserCreateDto): Promise<IUserDetails | HttpException> {
    const existingUser = await this.userService.findByEmail(user.email);

    if (existingUser) {
      return new HttpException(
        'User has already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.hashPassword(user.password);

    const newUser = await this.userService.create(user, hashedPassword);

    return this.userService.getUserDetails(newUser);
  }

  async login(
    userLoginDto: UserLoginDto,
  ): Promise<{ access_token: string } | HttpException> {
    const user = await this.validateUser(
      userLoginDto.email,
      userLoginDto.password,
    );

    if (!user) {
      return new HttpException(
        'Your credantials are wrong.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const jwt = await this.jwtService.signAsync(user);

    return { access_token: jwt };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserDetails | null> {
    const existingUser = await this.userService.findByEmail(email);

    if (!existingUser) return null;

    const isPasswordMatched = await this.hasMatchedPassword(
      password,
      existingUser.password,
    );

    if (!isPasswordMatched) return null;

    return this.userService.getUserDetails(existingUser);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async hasMatchedPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
