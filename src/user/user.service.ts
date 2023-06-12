import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { UserCreateDto } from './dto/user-create.dto';
import { IUserDetails } from './interfaces/user-details.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(
    body: Omit<UserCreateDto, 'password'>,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const user = new this.userModel({ ...body, password: hashedPassword });

    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<IUserDetails | HttpException> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return this.getUserDetails(user);
  }

  getUserDetails(user: UserDocument): IUserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
  }
}
