import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProviderContracts1759936851739
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'provider_contracts',
        columns: [
          { name: 'provider_id', type: 'uuid', isPrimary: true },
          { name: 'contract_id', type: 'uuid', isPrimary: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'provider_contracts',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedTableName: 'provider',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'provider_contracts',
      new TableForeignKey({
        columnNames: ['contract_id'],
        referencedTableName: 'contract',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('provider_contracts');
  }
}
