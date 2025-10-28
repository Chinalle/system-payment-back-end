import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Quotation1760729242723 implements MigrationInterface {
  private tableName = 'quotation';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "quotation_status_enum" AS ENUM('proposed', 'accepted', 'rejected', 'expired')`,
    );
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'request_id', type: 'uuid', isNullable: false },
          { name: 'provider_id', type: 'uuid' },
          { name: 'description', type: 'text' },
          { name: 'proposed_price_in_cents', type: 'int' },
          { name: 'estimated_duration_minutes', type: 'int' },
          { name: 'status', type: 'quotation_status_enum' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'expired_at', type: 'timestamptz', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKQuotationRequest',
            columnNames: ['request_id'],
            referencedTableName: 'quotation_request',
            referencedColumnNames: ['id'],
          },
          {
            name: 'FKUser',
            columnNames: ['provider_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
    await queryRunner.query(`DROP TYPE "quotation_status_enum"`);
  }
}
