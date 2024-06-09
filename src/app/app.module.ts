import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import {
  AnyExceptionFilter,
  HttpExceptionFilter,
} from '@/common/filters/HttpException.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '@/common/interceptors/rest-response.interceptor';
// import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as dotenv from 'dotenv';
// import * as fs from 'fs-extra';
import { winstonConfig } from '@/config/winston.config';
import { LoggingMiddleware } from '@/common/interceptors/logger.middleware';
import * as winston from 'winston';
import { UtilsService } from '@/common/utils/utils.service';
import { CategoryModule } from '@/modules/category/category.module';
import { MaterialModule } from '@/modules/material/material.module';
import { OrderModule } from '@/modules/order/order.module';
import { PositionModule } from '@/modules/position/position.module';
import { ProductModule } from '@/modules/product/product.module';
import { ProviderModule } from '@/modules/provider/provider.module';
import { ServiceModule } from '@/modules/service/service.module';
dotenv.config();

@Module({
  imports: [
    // UtilsService,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        // new winston.transports.File({
        //   filename: 'application.log',
        //   format: winston.format.combine(
        //     winston.format.timestamp(),
        //     winston.format.json(),
        //   ),
        // }),
      ],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    MaterialModule,
    OrderModule,
    PositionModule,
    ProductModule,
    ProviderModule,
    ServiceModule,

    // XxxModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      // port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_NAME,
      entities: [__dirname + '/../../src/database/entities/*.entity{.ts,.js}'],
      subscribers: [
        __dirname + '/../../src/database/subscribers/*.subscriber{.ts,.js}',
      ],
      synchronize: true,
      // migrationsRun: process.env.NODE_ENV !== 'development',
      autoLoadEntities: true,
      logging: false,
      migrations: [__dirname + '/../../src/database/migrations/*{.ts,.js}'],
      ssl: Boolean(process.env.DB_SSl) || false,
      // extra: {
      //   ssl: {
      //     ca: fs.readFileSync('./cer_ksi.crt'),
      //   },
      // },
    }),
  ],
  controllers: [AppController],
  providers: [
    UtilsService,
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: 'winston',
      useValue: winston.createLogger(winstonConfig),
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: SentryExceptionFilter,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
