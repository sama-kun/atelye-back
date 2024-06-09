import { MigrationInterface, QueryRunner } from 'typeorm';
import { categories } from '../seeds/category.seed';
import { CategoryEntity } from '../entities/category.entity';

export class CategorySeed9999999999993 implements MigrationInterface {
  name = 'CategorySeed9999999999993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) await queryRunner.commitTransaction();

    for (const user of categories) {
      await queryRunner.manager.insert(CategoryEntity, user);
    }

    await queryRunner.startTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "categories"`);
  }
}
