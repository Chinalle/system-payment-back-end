import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCompany1759936178034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'company_name', type: 'varchar', length: '45' },
          { name: 'user_id', type: 'uuid', isNullable: true, isUnique: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'company',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('company');
    const userForeignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('company', userForeignKey!);
    await queryRunner.dropTable('company');
  }
}
