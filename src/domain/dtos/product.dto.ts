import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly sku: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsOptional()
  @IsString({
    each: true,
  })
  @IsUrl()
  @ApiProperty({ description: 'The product images URLs' })
  readonly images?: string[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: true, description: 'The limit for pagination' })
  limit: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ required: true, description: 'The offset for pagination' })
  offset: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    required: false,
    description: 'The minimum price to filter products',
  })
  minPrice?: number;

  @ValidateIf((params) => params.minPrice != null)
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'maxPrice must be a positive number' })
  @ApiProperty({
    required: false,
    description: 'The maximum price to filter products',
  })
  maxPrice?: number;
}
