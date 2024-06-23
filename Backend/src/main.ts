import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './@core/filters/http-exception.filter';
import { ASSET_DIRECTORY, ASSET_PREFIX } from './@config/file-system.config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './@config/swagger.config';

async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', ASSET_DIRECTORY), {
    prefix: ASSET_PREFIX,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port: number = parseInt(process.env.PORT) || 8080;

  await app.listen(port);

  console.log('Application is running on: ', await app.getUrl());
}

bootstrap();
