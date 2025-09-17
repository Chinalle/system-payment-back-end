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
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          { name: 'full_name', type: 'varchar', length: '500' },
          { name: 'username', type: 'varchar', length: '120', isUnique: true },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'phone', type: 'varchar', isUnique: false },
          { name: 'password', type: 'text', isNullable: true },
          { name: 'cpf', type: 'varchar', isUnique: true, isNullable: true },
          { name: 'adress', type: 'text', isNullable: true },
          { name: 'role', type: 'text', isNullable: true },
          { name: 'is_active', type: 'boolean', default: true },
          { name: 'current_hashed_refresh_token', type: 'varchar', length: '255', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('migrating down');
    await queryRunner.query('DROP TABLE IF EXISTS "users";');
  }
}
