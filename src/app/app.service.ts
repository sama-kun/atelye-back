import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  logMessages() {
    this.logger.info('This is an info log message');
    this.logger.warn('This is a warning log message');
    this.logger.error('This is an error log message');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
