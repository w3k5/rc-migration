export interface DatabaseEnvironmentConfigurationInterface {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema: string;
}

export interface YDBEnvironmentConfigurationInterface {
  endpoint: string;
  database: string;
  user: string;
  password: string;
}

export interface CommonEnvironmentConfigurationInterface {
  port: number;
  frontendUrl: string;
}

export interface EnvironmentConfigurationInterface {
  oracle: DatabaseEnvironmentConfigurationInterface;
  ydb: YDBEnvironmentConfigurationInterface;
  application: CommonEnvironmentConfigurationInterface;
}
