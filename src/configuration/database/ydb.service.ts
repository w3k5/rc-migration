import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Driver, StaticCredentialsAuthService, getLogger, IDriverSettings } from 'ydb-sdk';
import { YDBEnvironmentConfigurationInterface } from '../environment/environment.interface';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

@Injectable()
export class YdbService implements OnModuleInit, OnModuleDestroy {
  private driver: Driver;

  private logger = getLogger();

  constructor(private readonly configService: ConfigService) {
    const { endpoint, database, user, password }: YDBEnvironmentConfigurationInterface = configService.get('ydb');

    // На внешке без секьюра, серт не нужен
    // const certsPath = path.resolve(process.cwd(), 'dist', 'assets', 'certs', 'ca_ift.crt');
    // const cert = fs.readFileSync(certsPath);

    // https://ydb.tech/docs/ru/concepts/connect

    // https://ydb.tech/docs/ru/recipes/ydb-sdk/auth-static
    const authService = new StaticCredentialsAuthService(user, password, endpoint, this.logger, {});

    const settings: IDriverSettings = {
      endpoint,
      database,
      authService,
      logger: this.logger,
    };

    this.driver = new Driver(settings);
  }

  async onModuleInit() {
    const ready = await this.driver.ready(SECOND * 5);
    if (!ready) {
      this.logger.fatal('Не подключился');
      return;
    }
    this.logger.info('Подключился');
  }

  async onModuleDestroy() {
    await this.driver.destroy();
  }

  async executeQuery(query: string, params: Record<string, any> = {}) {
    return this.driver.queryClient.do({
      fn: async (session) => {
        await session.execute({
          text: query,
        });
      },
    });
  }
}
