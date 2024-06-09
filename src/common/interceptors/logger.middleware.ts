import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      if (statusCode >= 400) {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} - ${responseTime}ms`,
        );
      } else {
        this.logger.info(
          `${method} ${originalUrl} ${statusCode} - ${responseTime}ms`,
        );
      }
    });

    next();
  }
}
