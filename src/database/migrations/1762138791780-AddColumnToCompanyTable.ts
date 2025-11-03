import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnToCompanyTable1762138791780
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('company', [
      new TableColumn({
        name: 'stripe_account_status',
        type: 'boolean',
        isNullable: true,
      }),
      new TableColumn({
        name: 'is_account_payments_active',
        type: 'boolean',
        isNullable: true,
      }),
      new TableColumn({
        name: 'pending_requirements',
        type: 'jsonb',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('company', [
      'stripe_account_status',
      'is_account_payments_active',
      'pending_requirements',
    ]);
  }
}
