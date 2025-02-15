import * as process from 'process';

import { EnvironmentConfigurationInterface } from './environment.interface';

export default (): EnvironmentConfigurationInterface => ({
  oracle: {
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    schema: process.env.DATABASE_SCHEMA as string,
  },
  ydb: {
    endpoint: process.env.YDB_ENDPOINT as string,
    database: process.env.YDB_DATABASE as string,
    user: process.env.YDB_USER as string,
    password: process.env.YDB_PASSWORD as string,
  },
  application: {
    port: +process.env.APPLICATION_PORT,
    frontendUrl: process.env.FRONTEND_URL,
  },
});
