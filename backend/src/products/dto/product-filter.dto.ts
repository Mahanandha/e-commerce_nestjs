import { IsOptional, IsString, IsBooleanString } from 'class-validator';

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  fromDate?: string;

  @IsOptional()
  @IsString()
  toDate?: string;

  @IsOptional()
  @IsBooleanString()
  inStock?: string;
}
