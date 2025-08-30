import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Logger } from '@nestjs/common';
export class User1756509827111 implements MigrationInterface {
  private readonly logger = new Logger(User1756509827111.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('migrating up');

    await queryRunner.query('DROP TABLE IF EXISTS "users";');

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('migrating up');
    await queryRunner.dropTable('"users"');
  }
}
