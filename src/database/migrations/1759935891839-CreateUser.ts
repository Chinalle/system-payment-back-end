import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUser1759935891839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
          { name: 'full_name', type: 'varchar', length: '255' },
          { name: 'phone', type: 'varchar', length: '45' },
          { name: 'cpf_cnpj', type: 'varchar', length: '45', isUnique: true },
          { name: 'birth_date', type: 'date' },
          { name: 'role', type: 'user_role_enum' },
          { name: 'is_active', type: 'boolean' },
          {
            name: 'current_hashed_refresh_token',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
          { name: 'login_id', type: 'uuid', isNullable: true, isUnique: true },
          {
            name: 'address_id',
            type: 'uuid',
            isNullable: true,
            isUnique: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['login_id'],
        referencedTableName: 'login',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedTableName: 'address',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');
    const loginForeignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('login_id') !== -1,
    );
    const addressForeignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('address_id') !== -1,
    );

    await queryRunner.dropForeignKey('users', loginForeignKey!);
    await queryRunner.dropForeignKey('users', addressForeignKey!);

    await queryRunner.dropTable('users');
  }
}
