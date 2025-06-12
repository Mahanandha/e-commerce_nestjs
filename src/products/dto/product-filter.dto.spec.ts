import { validate } from 'class-validator';
import { ProductFilterDto } from './product-filter.dto';

describe('ProductFilterDto', () => {
  it('should pass validation with all valid fields', async () => {
    const dto = new ProductFilterDto();
    dto.name = 'Sample';
    dto.fromDate = '2023-01-01';
    dto.toDate = '2023-12-31';
    dto.inStock = 'true';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with invalid inStock value', async () => {
    const dto = new ProductFilterDto();
    dto.inStock = 'maybe'; // invalid boolean string

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('inStock');
  });

  it('should allow optional fields to be missing', async () => {
    const dto = new ProductFilterDto();

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
