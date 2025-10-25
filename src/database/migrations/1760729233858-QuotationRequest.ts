import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class QuotationRequest1760729233858 implements MigrationInterface {
  private tableName = 'quotation_request';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "quotation_request_status_enum" AS ENUM('pending', 'answered', 'canceled')`,
    );
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'service_id', type: 'uuid', isNullable: false },
          { name: 'client_id', type: 'uudi' },
          { name: 'client_notes', type: 'text' },
          { name: 'status', type: 'quotation_request_status_enum' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
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
          {
            name: 'FKUser',
            columnNames: ['client_id'],
            referencedTableName: 'users',
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
