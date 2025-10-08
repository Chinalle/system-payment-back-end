import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddress1759935805066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'public_place', type: 'varchar', length: '255' },
          { name: 'district', type: 'varchar', length: '255' },
          { name: 'house_number', type: 'varchar', length: '45' },
          { name: 'city', type: 'varchar', length: '255' },
          { name: 'state', type: 'varchar', length: '255' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
