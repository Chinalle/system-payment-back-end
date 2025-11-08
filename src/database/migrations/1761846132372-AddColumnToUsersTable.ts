import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnToUsersTable1761846132372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'stripe_customer_id',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'stripe_customer_id');
  }
}
