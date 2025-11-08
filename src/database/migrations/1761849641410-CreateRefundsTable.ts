import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRefundsTable1761849641410 implements MigrationInterface {
  /* [x] Nova Tabela refund: Criar a tabela de estornos com as colunas: 
  id, 
  payment_id (FK), 
  stripe_refund_id (string, unique), 
  amount_in_cents, 
  reason, 
  status, 
  created_at. 
  */
  private tableName = 'refunds';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'payment_id', type: 'text' },
          { name: 'stripe_refund_id', type: 'text' },
          { name: 'amount_in_cents', type: 'int' },
          { name: 'reason', type: 'int' },
          { name: 'status', type: 'text' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
