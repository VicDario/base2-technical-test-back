import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  IsMongoId,
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The brand that product belongs' })
  readonly brand: string;
  
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: 'The mongo id of the category' })
  readonly category: string;

  @IsOptional()
  @IsString({
    each: true,
  })
  @ApiProperty({ description: 'The product images URLs' })
  readonly images?: string[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
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
