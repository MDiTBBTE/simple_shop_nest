import { IsArray, IsOptional, IsString } from 'class-validator';
import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsOptional()
  roles: string[];
}
