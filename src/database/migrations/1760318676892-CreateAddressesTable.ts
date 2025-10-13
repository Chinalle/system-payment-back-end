import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddressesTable1760318676892 implements MigrationInterface {
  private tableName = 'addresses';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'street', type: 'varchar', length: '100', isNullable: false },
          { name: 'number', type: 'varchar', length: '20', isNullable: false },
          {
            name: 'complement',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          { name: 'city', type: 'varchar', length: '100', isNullable: false },
          { name: 'state', type: 'varchar', length: '2', isNullable: false },
          { name: 'zipCode', type: 'varchar', length: '15', isNullable: false },
          { name: 'user_id', type: 'uuid', isNullable: true },
          { name: 'company_id', type: 'uuid', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKUserAddress',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKCompany',
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
    await queryRunner.dropTable(this.tableName);
  }
}
