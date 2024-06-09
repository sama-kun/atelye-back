import { Module, forwardRef } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from '@/database/entities/position.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PositionController],
  providers: [PositionService],
  imports: [
    // MongooseModule.forFeature([{ name: 'Position', schema: PositionSchema }])
    TypeOrmModule.forFeature([PositionEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [PositionService],
})
export class PositionModule {}
