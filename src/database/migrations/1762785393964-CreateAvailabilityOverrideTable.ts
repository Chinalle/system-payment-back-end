import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAvailabilityOverrideTable1762785393964 implements MigrationInterface {

    private tableName = 'availability_override';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' },
                    { name: 'user_id', type: 'uuid', isNullable: false },
                    { name: 'override_date', type: 'date', isNullable: false },
                    { name: 'start_time', type: 'time', isNullable: true },
                    { name: 'end_time', type: 'time', isNullable: true },
                    { name: 'is_available', type: 'boolean', default: false },
                    { name: 'description', type: 'text', isNullable: true },
                ],
                foreignKeys: [
                    {
                        name: 'FK_Override_User',
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