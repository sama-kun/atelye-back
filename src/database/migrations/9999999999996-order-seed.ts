import { MigrationInterface, QueryRunner } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { orders } from '../seeds/order.seed';

export class OrderSeed9999999999996 implements MigrationInterface {
  name = 'OrderSeed9999999999996';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) await queryRunner.commitTransaction();

    for (const user of orders) {
      await queryRunner.manager.save(OrderEntity, user);
    }

    await queryRunner.startTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "orders"`);
    await queryRunner.query(`DELETE FROM "huetas"`);
  }
}
