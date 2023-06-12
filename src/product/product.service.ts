import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { FilterProductDTO } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(body: ProductCreateDto): Promise<ProductDocument> {
    const newProduct = new this.productModel(body);

    return newProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findFilteredProducts(
    filterProductDTO: FilterProductDTO,
  ): Promise<ProductDocument[]> {
    const priceSortOrder =
      filterProductDTO.price === 'ASC' ? 'price' : '-price';

    return this.productModel
      .find({
        category: filterProductDTO.category,
      })
      .sort(priceSortOrder)
      .exec();
  }

  async find(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, body: ProductUpdateDto): Promise<ProductDocument> {
    const product = await this.find(id);

    product.name = body.name || product.name;
    product.description = body.description || product.description;
    product.price = body.price || product.price;
    product.amount = body.amount || product.amount;

    return product.save();
  }

  async delete(id: string) {
    return this.productModel.findByIdAndRemove(id);
  }
}
