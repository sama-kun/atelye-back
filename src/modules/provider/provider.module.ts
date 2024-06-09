import { Module, forwardRef } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderEntity } from '@/database/entities/provider.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports: [
    // MongooseModule.forFeature([{ name: 'Provider', schema: ProviderSchema }])
    TypeOrmModule.forFeature([ProviderEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [ProviderService],
})
export class ProviderModule {}
