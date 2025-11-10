import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAvailabilityTables1762373718906
  implements MigrationInterface {
  private tableName = 'availability';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'user_id', type: 'uuid', isNullable: false },
          { name: 'day_of_week', type: 'int', isNullable: false },
          { name: 'start_time', type: 'timestamptz' },
          { name: 'end_time', type: 'timestamptz' },
          { name: 'is_available', type: 'boolean' },
        ],

        foreignKeys: [
          {
            name: 'FKUser',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
