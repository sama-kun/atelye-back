import { Module, forwardRef } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialEntity } from '@/database/entities/material.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService],
  imports: [
    // MongooseModule.forFeature([{ name: 'Material', schema: MaterialSchema }])
    TypeOrmModule.forFeature([MaterialEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [MaterialService],
})
export class MaterialModule {}
