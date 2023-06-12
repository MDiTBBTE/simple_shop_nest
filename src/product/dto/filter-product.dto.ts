import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterProductDTO {
  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsEnum({ ASC: 'ASC', DESC: 'DESC' })
  @IsOptional()
  price: 'ASC' | 'DESC';
}
