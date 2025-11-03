import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompanyMember1760319191130 implements MigrationInterface {
  private tableTable = 'company_member';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "company_role_enum" AS ENUM('manager', 'collaborator')`,
    );
    await queryRunner.createTable(
      new Table({
        name: this.tableTable,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'user_id', type: 'uuid', isUnique: true },
          { name: 'company_id', type: 'uuid', isUnique: true },
          { name: 'provider_role', type: 'company_role_enum' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKUserMember',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKCompanyMember',
            columnNames: ['company_id'],
            referencedTableName: 'company',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableTable);
  }
}
