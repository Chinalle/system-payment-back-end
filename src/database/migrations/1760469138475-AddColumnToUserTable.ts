import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnToUserTable1760469138475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'reset_password_token',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'reset_password_expires',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      'reset_password_token',
      'reset_password_expires',
    ]);
  }
}
