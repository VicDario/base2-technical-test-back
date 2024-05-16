import { SeedUseCasesService } from '@/use-cases/seed-use-cases/seed.use-cases.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedUseCasesService) {}

  @Get()
  @ApiOperation({ summary: 'Seed the database' })
  seed() {
    return this.seedService.seed();
  }
}
