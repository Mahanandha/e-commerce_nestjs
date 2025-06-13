import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

// ✅ Mock class for the Product model
const mockProductModel = jest.fn().mockImplementation((dto) => ({
  ...dto,
  save: jest.fn().mockResolvedValue({ _id: 'mockId', ...dto }),
}));

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel, // ✅ pass the constructor mock
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should create a product', async () => {
    const dto = { name: 'Test Product', price: 100 };
    const imageUrls = ['/uploads/image.jpg'];

    const result = await service.create(dto, imageUrls);

    expect(result).toEqual({
      _id: 'mockId',
      name: 'Test Product',
      price: 100,
      images: imageUrls,
    });
  });
});
