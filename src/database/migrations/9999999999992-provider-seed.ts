import { MigrationInterface, QueryRunner } from 'typeorm';
import { providers } from '../seeds/provider.seed';
import { ProviderEntity } from '../entities/provider.entity';

export class ProviderSeed9999999999992 implements MigrationInterface {
  name = 'ProviderSeed9999999999992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) await queryRunner.commitTransaction();

    for (const user of providers) {
      await queryRunner.manager.insert(ProviderEntity, user);
    }

    await queryRunner.startTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "providers"`);
  }
}
