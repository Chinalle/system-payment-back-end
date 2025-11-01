import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAppointmentsTable1761882590366
  implements MigrationInterface
{
  private tableName = '';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 	uuid id PK "ID do agendamento"
    // uuid service_pricing_id FK "Variação de preço agendada (se aplicável)"
    // uuid quotation_id FK "Orçamento que gerou o agendamento (se aplicável)"
    // uuid client_id FK "Cliente"
    // uuid provider_id FK "Provider"
    // enum status  "SCHEDULED, CONFIRMED, CANCELED, COMPLETED"
    // datetime start_time  "Início do agendamento"
    // datetime end_time  "Fim do agendamento"
    // text client_notes  ""
    await queryRunner.query(
      `CREATE TYPE "appointment_status_enum" AS ENUM('scheduled', 'confirmed', 'canceled', 'completed')`,
    );
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'service_pricing_id', type: 'uuid', isNullable: true },
          { name: 'quotation_id', type: 'uuid', isNullable: true },
          { name: 'client_id', type: 'text' }, // Depois preciso recuperar o stripe_customer_id **
          { name: 'provider_id', type: 'text' }, // Recuperar a conta da empresa no stripe (stripe_company_id - acc_...) do member company
          { name: 'status', type: 'appointment_status_enum' },
          { name: 'start_time', type: 'timestamptz' },
          { name: 'end_time', type: 'timestamptz' },
          { name: 'client_notes', type: 'text' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKService',
            columnNames: ['service_id'],
            referencedTableName: 'services',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKUser',
            columnNames: ['client_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKCompanyMember',
            columnNames: ['provider_id'],
            referencedTableName: 'company_member',
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
    await queryRunner.query('DROP TYPE appointment_status_enum');
  }
}
