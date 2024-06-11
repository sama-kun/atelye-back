import { Module, forwardRef } from '@nestjs/common';
import { HuetaController } from './hueta.controller';
import { HuetaService } from './hueta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HuetaEntity } from '@/database/entities/Hueta.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [HuetaController],
  providers: [HuetaService],
  imports: [
    // MongooseModule.forFeature([{ name: 'Hueta', schema: HuetaSchema }])
    TypeOrmModule.forFeature([HuetaEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [HuetaService],
})
export class HuetaModule {}
