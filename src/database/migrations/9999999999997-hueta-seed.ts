import { MigrationInterface, QueryRunner } from 'typeorm';
import { HuetaEntity } from '../entities/hueta.entity';
import { huetas } from '../seeds/hueta.seed';

export class HuetaSeed9999999999997 implements MigrationInterface {
  name = 'HuetaSeed9999999999997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) await queryRunner.commitTransaction();

    for (const user of huetas) {
      await queryRunner.manager.save(HuetaEntity, user);
    }

    await queryRunner.startTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "huetas"`);
  }
}
