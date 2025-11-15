import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCompanyTable1763180353359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('company', [
      {
        oldColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
          length: '45',
        }),
        newColumn: new TableColumn({
          name: 'name',
          type: 'text',
          isNullable: false,
          isUnique: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('company', [
      {
        oldColumn: new TableColumn({
          name: 'name',
          type: 'text',
        }),
        newColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
          length: '45',
        }),
      },
    ]);
  }
}
