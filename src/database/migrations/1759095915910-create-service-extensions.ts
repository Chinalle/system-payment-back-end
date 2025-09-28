import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateServiceExtensions1678901234567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service_image',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'url', type: 'varchar' },
          { name: 'description', type: 'varchar', isNullable: true },
          { name: 'serviceId', type: 'uuid' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'service_image',
      new TableForeignKey({
        columnNames: ['serviceId'],
        referencedTableName: 'service',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'service_payment_option',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'price', type: 'decimal', precision: 10, scale: 2 },
          { name: 'condition', type: 'varchar', length: '100' },
          { name: 'serviceId', type: 'uuid' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'service_payment_option',
      new TableForeignKey({
        columnNames: ['serviceId'],
        referencedTableName: 'service',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service_payment_option');
    await queryRunner.dropTable('service_image');
  }
}
