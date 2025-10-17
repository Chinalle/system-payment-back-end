import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServicePortfolioImages1760728686173
  implements MigrationInterface
{
  private tableName = 'service_portfolio_images';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'portfolio_images_id', type: 'uuid' },
          { name: 'service_id', type: 'uuid' },
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
            name: 'FKPortfolioImages',
            columnNames: ['portfolio_images_id'],
            referencedTableName: 'portfolio_images',
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
