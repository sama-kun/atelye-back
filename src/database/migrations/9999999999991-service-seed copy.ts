import { MigrationInterface, QueryRunner } from 'typeorm';
import { ServiceEntity } from '@/database/entities/service.entity';
import { services } from '../seeds/service.seed';

export class ServiceSeed9999999999991 implements MigrationInterface {
  name = 'ServiceSeed9999999999991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) await queryRunner.commitTransaction();

    for (const user of services) {
      await queryRunner.manager.insert(ServiceEntity, user);
    }

    await queryRunner.startTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "services"`);
  }
}
