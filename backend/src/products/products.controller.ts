import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Query } from '@nestjs/common';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async createSingle(
    @Body() dto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = file ? `/uploads/${file.filename}` : '';
    return this.productsService.create(dto, [imageUrl]);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('images', 5, { storage }))
  async createMultiple(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const imageUrls = files.map((file) => `/uploads/${file.filename}`);
    return this.productsService.create(dto, imageUrls);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }
  @Get('filter')
  async filterProducts(
    @Query('name') name?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
    @Query('inStock') inStock?: string,
  ) {
    return this.productsService.filter({ name, fromDate, toDate, inStock });
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
