import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const mockProduct = {
  _id: '1',
  name: 'Test Product',
  price: 100,
  stock: 10,
  images: ['/uploads/test.jpg'],
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockService = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    filter: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue({ ...mockProduct, name: 'Updated' }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create product with single image', async () => {
    const dto: CreateProductDto = { name: 'Test Product', price: 100, stock: 10 };
    const result = await controller.createSingle(dto, { filename: 'test.jpg' } as any);
    expect(service.create).toHaveBeenCalledWith(dto, ['/uploads/test.jpg']);
    expect(result).toEqual(mockProduct);
  });

  it('should create product with multiple images', async () => {
    const dto: CreateProductDto = { name: 'Test Product', price: 100, stock: 10 };
    const files = [
      { filename: 'img1.jpg' },
      { filename: 'img2.jpg' },
    ] as any;
    const result = await controller.createMultiple(dto, files);
    expect(service.create).toHaveBeenCalledWith(dto, ['/uploads/img1.jpg', '/uploads/img2.jpg']);
    expect(result).toEqual(mockProduct);
  });

  it('should return all products', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockProduct]);
  });

  it('should filter products', async () => {
    const result = await controller.filterProducts('Test', '2024-01-01', '2025-01-01', 'true');
    expect(service.filter).toHaveBeenCalled();
    expect(result).toEqual([mockProduct]);
  });

  it('should return one product', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockProduct);
  });

  it('should update product', async () => {
    const dto: UpdateProductDto = { name: 'Updated' };
    const result = await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual({ ...mockProduct, name: 'Updated' });
  });

  it('should remove product', async () => {
    const result = await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
    expect(result).toEqual({ deleted: true });
  });
});
