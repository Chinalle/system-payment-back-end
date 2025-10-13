import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateService1760325816962 implements MigrationInterface {
  private tableName = 'services';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          { name: 'name', type: 'varchar' },
          { name: 'description', type: 'text' },
          { name: 'requires_quotation', type: 'boolean', default: false },
          { name: 'is_active', type: 'boolean', default: true },
          { name: 'company_id', type: 'uuid' },
          { name: 'category_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKServiceCompany',
            columnNames: ['company_id'],
            referencedTableName: 'company',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKServiceCategory',
            columnNames: ['category_id'],
            referencedTableName: 'category',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
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
