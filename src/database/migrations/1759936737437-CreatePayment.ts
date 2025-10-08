import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePayment1759936737437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payment',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'price_in_cents', type: 'float' },
          { name: 'status', type: 'payment_status_enum', default: "'pending'" },
          { name: 'payment_method', type: 'payment_method_enum' },
          { name: 'installments', type: 'int', isNullable: true },
          { name: 'processed_in', type: 'timestamp', isNullable: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payment');
  }
}
