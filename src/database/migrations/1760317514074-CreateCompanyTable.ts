import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompanyTable1760317514074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '45', isUnique: true },
          { name: 'cnpj', type: 'varchar', length: '45', isUnique: true },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'logo_img', type: 'text', isNullable: true },
          { name: 'business_hours', type: 'jsonb', isNullable: true },
          {
            name: 'rating',
            type: 'decimal',
            precision: 3,
            scale: 2,
            default: 5,
          },
          { name: 'stripe_account_id', type: 'text' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company');
  }
}
