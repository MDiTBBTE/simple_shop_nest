import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PRODUCT_CATEGORY } from 'src/utils/types';

export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsEnum(PRODUCT_CATEGORY)
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  description?: string;
}
