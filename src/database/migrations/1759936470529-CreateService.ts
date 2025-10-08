import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateService1759936470529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'service_name', type: 'varchar', length: '45' },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'estimated_duration_minutes', type: 'int', isNullable: true },
          { name: 'price_in_cents', type: 'int' },
          { name: 'category_id', type: 'uuid', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'service',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'service_category',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('service');
    const categoryForeignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('category_id') !== -1,
    );
    await queryRunner.dropForeignKey('service', categoryForeignKey!);
    await queryRunner.dropTable('service');
  }
}
