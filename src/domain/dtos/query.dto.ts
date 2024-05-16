import { IsNumber, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsNumber()
  @Min(0)
  @ApiProperty()
  offset: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  limit: number;
}
