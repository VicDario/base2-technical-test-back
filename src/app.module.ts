import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envs, validateConfig } from './config/env.config';
import { RoutesModule } from './presentation/routes/routes.module';
import { MongoDatabaseModule } from './data/mongo/mongo-database.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UseCasesModule } from './infrastructure/use-cases/use-cases.module';
import { DatasourcesModule } from './infrastructure/datasources/datasources.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [envs],
      isGlobal: true,
      validationSchema: validateConfig,
    }),
    MongoDatabaseModule,
    RoutesModule,
    RepositoriesModule,
    UseCasesModule,
    DatasourcesModule,
  ],
})
export class AppModule {}
