import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DatabaseEnvironmentConfigurationInterface,
  EnvironmentConfigurationInterface,
} from '../environment/environment.interface';

export default (configService: ConfigService<EnvironmentConfigurationInterface>): TypeOrmModuleOptions => {
  const { database, host, username, password, port }: DatabaseEnvironmentConfigurationInterface =
    configService.get('oracle');

  return {
    type: 'oracle',
    synchronize: false,
    autoLoadEntities: true,
    serviceName: database,
    extra: {
      poolMax: 100_000,
      queueMax: 100_000,
    },
    database,
    host,
    username,
    password,
    port,
  };
};
