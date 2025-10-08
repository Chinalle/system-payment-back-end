import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateContract1759936765111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contract',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'hiring_date', type: 'timestamp', default: 'now()' },
          { name: 'total_value_in_cents', type: 'int' },
          {
            name: 'status',
            type: 'contract_status_enum',
            default: "'pending'",
          },
          { name: 'term', type: 'date', isNullable: true },
          { name: 'user_id', type: 'uuid', isNullable: true },
          { name: 'company_id', type: 'uuid', isNullable: true },
          {
            name: 'payment_id',
            type: 'uuid',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'service_id',
            type: 'uuid',
            isNullable: true,
            isUnique: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'contract',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'contract',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'contract',
      new TableForeignKey({
        columnNames: ['payment_id'],
        referencedTableName: 'payment',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'contract',
      new TableForeignKey({
        columnNames: ['service_id'],
        referencedTableName: 'service',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contract');
  }
}
