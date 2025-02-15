import { Module } from '@nestjs/common';
import { YdbService } from './ydb.service';

@Module({
  providers: [YdbService],
  exports: [YdbService],
})
export class YdbModule {}
