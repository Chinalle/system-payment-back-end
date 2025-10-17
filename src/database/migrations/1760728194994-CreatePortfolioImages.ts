import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePortfolioImages1760728194994 implements MigrationInterface {
  private tableName = 'portfolio_images';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'company_id', type: 'uuid' },
          { name: 'image_base64', type: 'text' },
          { name: 'mime_type', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'display_order', type: 'int', isNullable: true },
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
