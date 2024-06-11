import { MigrationInterface, QueryRunner } from 'typeorm';
import { products } from '../seeds/product.seed';
import { ProductEntity } from '../entities/product.entity';

export class ProductSeed9999999999995 implements MigrationInterface {
  name = 'ProductSeed9999999999995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) await queryRunner.commitTransaction();

    for (const user of products) {
      await queryRunner.manager.insert(ProductEntity, user);
    }

    await queryRunner.startTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "products"`);
  }
}
