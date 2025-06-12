import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

interface ProductFilterQuery {
  name?: string;
  fromDate?: string;
  toDate?: string;
  inStock?: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto, imageUrls: string[]) {
    const created = new this.productModel({ ...dto, images: imageUrls });
    return created.save();
  }

  async findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    return this.productModel.findById(id);
  }

  async update(id: string, dto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  async filter(query: ProductFilterQuery) {
    const filter: Record<string, any> = {};

    if (query.name) {
      filter.name = { $regex: query.name, $options: 'i' };
    }

    if (query.fromDate || query.toDate) {
      const createdAtFilter: Record<string, Date> = {};
      if (query.fromDate) createdAtFilter.$gte = new Date(query.fromDate);
      if (query.toDate) createdAtFilter.$lte = new Date(query.toDate);
      filter.createdAt = createdAtFilter;
    }

    if (query.inStock === 'true') {
      filter.stock = { $gt: 0 };
    }

    return this.productModel.find(filter);
  }
}
