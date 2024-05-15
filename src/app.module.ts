import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envs, validateConfig } from './config/env.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [envs],
      isGlobal: true,
      validationSchema: validateConfig,
    }),
  ],
})
export class AppModule {}
