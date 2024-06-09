import { MigrationInterface, QueryRunner } from 'typeorm';
import { materials } from '../seeds/material.seed';
import { MaterialEntity } from '../entities/material.entity';

export class MaterialSeed9999999999992 implements MigrationInterface {
  name = 'MaterialSeed9999999999992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) await queryRunner.commitTransaction();

    for (const user of materials) {
      await queryRunner.manager.insert(MaterialEntity, user);
    }

    await queryRunner.startTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "materials"`);
  }
}
