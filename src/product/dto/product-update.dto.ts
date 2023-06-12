import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PRODUCT_CATEGORY } from 'src/utils/types';

export class ProductUpdateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsEnum(PRODUCT_CATEGORY)
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  description?: string;
}
