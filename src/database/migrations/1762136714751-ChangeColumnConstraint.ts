import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeColumnConstraint1762136714751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'company',
      'cnpj',
      new TableColumn({
        name: 'cnpj',
        type: 'text',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'company',
      'cnpj',
      new TableColumn({
        name: 'cnpj',
        type: 'varchar',
        length: '45',
        isNullable: true,
      }),
    );
  }
}
