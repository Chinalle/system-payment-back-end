import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServicePricing1760325816963 implements MigrationInterface {
  private tableName = 'services_pricing';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'service_id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '120' },
          { name: 'description', type: 'text' },
          { name: 'price_in_cents', type: 'int' },
          { name: 'duration_in_minutes', type: 'int' },
          { name: 'is_active', type: 'boolean', default: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKService',
            columnNames: ['service_id'],
            referencedTableName: 'services',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
