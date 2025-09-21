import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Logger } from '@nestjs/common';
export class Service1757889794782 implements MigrationInterface {
  private readonly logger = new Logger(Service1757889794782.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('migrating up');

    await queryRunner.query('DROP TABLE IF EXISTS "services";');

    await queryRunner.createTable(
      new Table({
        name: 'services',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          { name: 'name', type: 'varchar', length: '100' },
          { name: 'description', type: 'text' },
          { name: 'category', type: 'varchar', length: '50' },
          { name: 'estimated_duration', type: 'int' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('migrating down');
    await queryRunner.query('DROP TABLE IF EXISTS "services";');
  }
}
