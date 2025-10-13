import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1760317416575 implements MigrationInterface {
  private tableName = 'users';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  CREATE TYPE "user_role_enum" AS ENUM('client', 'provider', 'admin')
`);

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          { name: 'full_name', type: 'varchar', length: '255' },
          { name: 'email', type: 'varchar', length: '255', isUnique: true },
          { name: 'password_hash', type: 'varchar', length: '255' },
          { name: 'phone', type: 'varchar', length: '45', isNullable: true },
          { name: 'cpf', type: 'varchar', length: '45', isUnique: true },
          { name: 'birth_date', type: 'date', isNullable: true },
          { name: 'role', type: 'user_role_enum' },
          { name: 'is_active', type: 'boolean' },
          {
            name: 'current_hashed_refresh_token',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          { name: 'is_confirmed', type: 'boolean' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}
