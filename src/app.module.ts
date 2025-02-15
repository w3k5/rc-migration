import { Module } from '@nestjs/common';
import { EnvironmentModule } from './configuration/environment/environment.module';
import { YdbModule } from './configuration/database/ydb.module';

@Module({
  imports: [EnvironmentModule, YdbModule],
})
export class AppModule {}
