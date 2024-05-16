import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { UseCasesModule } from '@/use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [SeedController],
})
export class SeedModule {}
