import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProvider1759936629328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'provider',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'provider_name', type: 'varchar', length: '255' },
          { name: 'role', type: 'provider_role_enum' },
          { name: 'login_id', type: 'uuid', isNullable: true, isUnique: true },
          { name: 'company_id', type: 'uuid', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'provider',
      new TableForeignKey({
        columnNames: ['login_id'],
        referencedTableName: 'login',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'provider',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('provider');
    const loginForeignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('login_id') !== -1,
    );
    const companyForeignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('company_id') !== -1,
    );

    await queryRunner.dropForeignKey('provider', loginForeignKey!);
    await queryRunner.dropForeignKey('provider', companyForeignKey!);

    await queryRunner.dropTable('provider');
  }
}
