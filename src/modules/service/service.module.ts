import { Module, forwardRef } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '@/database/entities/service.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  imports: [
    // MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }])
    TypeOrmModule.forFeature([ServiceEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [ServiceService],
})
export class ServiceModule {}
