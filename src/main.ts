import { BadRequestException, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import {
  CommonEnvironmentConfigurationInterface,
  EnvironmentConfigurationInterface,
} from './configuration/environment/environment.interface';
import { types } from 'pg';
types.setTypeParser(1700, (x) => parseFloat(x));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const configService: ConfigService<EnvironmentConfigurationInterface> = app.get(ConfigService);
  const appConfig = configService.get<CommonEnvironmentConfigurationInterface>('application');

  app.enableCors({
    origin: appConfig.frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
      enableDebugMessages: true,
      exceptionFactory: (errors) => {
        const targets = errors.map((error) => error.target);
        const validationErrors = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));

        logger.debug('Поступившие данные', JSON.stringify(targets, null, 2));
        logger.debug('Ошибка валидации', JSON.stringify(validationErrors, null, 2));
        return new BadRequestException(validationErrors);
      },
    }),
  );

  const config = new DocumentBuilder().setTitle('Nail System').setVersion('1.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
