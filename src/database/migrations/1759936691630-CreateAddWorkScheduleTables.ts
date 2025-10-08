import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAddWorkScheduleTables1759936691630
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'work_schedules',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'day_of_week', type: 'int' },
          { name: 'is_active', type: 'boolean', default: true },
          { name: 'start_time', type: 'time' },
          { name: 'end_time', type: 'time' },
          { name: 'provider_id', type: 'uuid' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'work_schedules',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedTableName: 'provider',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'schedule_breaks',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '100' },
          { name: 'start_time', type: 'time' },
          { name: 'end_time', type: 'time' },
          { name: 'work_schedule_id', type: 'uuid' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'schedule_breaks',
      new TableForeignKey({
        columnNames: ['work_schedule_id'],
        referencedTableName: 'work_schedules',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'schedule_overrides',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'date', type: 'date' },
          { name: 'is_active', type: 'boolean' },
          { name: 'start_time', type: 'time', isNullable: true },
          { name: 'end_time', type: 'time', isNullable: true },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'provider_id', type: 'uuid' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'schedule_overrides',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedTableName: 'provider',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('schedule_overrides');
    await queryRunner.dropTable('schedule_breaks');
    await queryRunner.dropTable('work_schedules');
  }
}
