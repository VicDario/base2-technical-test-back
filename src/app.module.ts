import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
