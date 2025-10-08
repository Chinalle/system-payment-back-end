import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLogin1759935510715 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'login',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'email', type: 'varchar', length: '100', isUnique: true },
          { name: 'password', type: 'varchar', length: '255' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('login');
  }
}
