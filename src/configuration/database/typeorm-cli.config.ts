import { DataSource } from 'typeorm';
import * as path from 'node:path';
import * as dotenv from 'dotenv';
import loadEnvironmentConfiguration from '../environment/environment.configuration';

dotenv.config();

const config = loadEnvironmentConfiguration().oracle;

export default new DataSource({
  type: 'oracle',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  migrations: [path.resolve(__dirname, 'migrations/**/*{.ts,.js}')],
  logging: true,
  migrationsRun: true,
});
