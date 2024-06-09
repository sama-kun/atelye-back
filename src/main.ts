import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  AnyExceptionFilter,
  HttpExceptionFilter,
} from './common/filters/HttpException.filter';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/rest-response.interceptor';
import RateLimit from 'express-rate-limit';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import swaggerInit from '@/config/swagger.config';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as packages from '../package.json';
// import * as Sentry from '@sentry/node';
import { LoggingMiddleware } from '@/common/interceptors/logger.middleware';

async function bootstrap() {
  const logger = new Logger(packages.name);
  logger.log(
    `Application [${packages.name}] is starting...` + process.env.CHROME_PATH,
  );
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  swaggerInit(app);
  app.enableCors();
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // Strip properties that are not in the DTO
      // forbidNonWhitelisted: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  await app.listen(process.env.PORT);
  app.use(new LoggingMiddleware(app.get('winston')).use);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useLogger(logger);
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
  );
  app.use(
    RateLimit({
      windowMs: 5 * 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 100 requests per windowMs
      handler: (request, response) => {
        return response.status(501).send({
          error: {
            message: 'Too many requests. Please keep calm and get slow down.',
            details: `More then 1000 requests in last minute from your IP`,
          },
        });
      },
    }),
  );

  console.log(`
  ${packages.name} ver ${packages.version} (Template) by Samgar Seriknur @lieproger
  Started at lo http://localhost:${process.env.PORT}
  NODE_ENV=${process.env.NODE_ENV}
  `);
  // swaggerInit(app);
}
bootstrap().catch((e) => {
  throw new Error(e);
});
