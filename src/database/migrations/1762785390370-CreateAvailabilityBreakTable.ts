import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAvailabilityBreakTable1762785390370 implements MigrationInterface {

    private tableName = 'availability_break';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' },
                    { name: 'availability_id', type: 'uuid', isNullable: false },
                    { name: 'name', type: 'varchar', length: '100', isNullable: true },
                    { name: 'start_time', type: 'time', isNullable: false },
                    { name: 'end_time', type: 'time', isNullable: false },
                ],
                foreignKeys: [
                    {
                        name: 'FK_Break_Availability',
                        columnNames: ['availability_id'],
                        referencedTableName: 'availability',
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
