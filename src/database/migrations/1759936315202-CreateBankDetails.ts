import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBankDetails1759936315202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bank_details',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'account', type: 'varchar', length: '45' },
          { name: 'agency', type: 'varchar', length: '45' },
          { name: 'bank', type: 'varchar', length: '45' },
          { name: 'key_pix', type: 'varchar', length: '255' },
          { name: 'company_id', type: 'uuid', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'bank_details',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('bank_details');
    const companyForeignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('company_id') !== -1,
    );
    await queryRunner.dropForeignKey('bank_details', companyForeignKey!);
    await queryRunner.dropTable('bank_details');
  }
}
