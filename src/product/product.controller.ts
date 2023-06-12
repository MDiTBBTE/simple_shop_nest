import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductDocument } from './schemas/product.schema';
import { ProductUpdateDto } from './dto/product-update.dto';
import { FilterProductDTO } from './dto/filter-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() body: ProductCreateDto): Promise<ProductDocument> {
    return this.productService.create(body);
  }

  @Get()
  getAllProducts(): Promise<ProductDocument[]> {
    return this.productService.findAll();
  }

  @Get('/params')
  getFilteredProducts(
    @Query() filterProductDTO: FilterProductDTO,
  ): Promise<ProductDocument[]> {
    return this.productService.findFilteredProducts(filterProductDTO);
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.find(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: ProductUpdateDto,
  ): Promise<ProductDocument> {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
