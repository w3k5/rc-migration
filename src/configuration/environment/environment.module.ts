import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import loadEnvironmentConfiguration from './environment.configuration';
import validationSchema from './environment.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvironmentConfiguration],
      validationSchema: validationSchema,
    }),
  ],
})
export class EnvironmentModule {}
