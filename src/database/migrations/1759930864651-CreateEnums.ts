import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEnums1759930864651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('client', 'manager', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."provider_role_enum" AS ENUM('collaborator', 'supervisor', 'coordinator')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."contract_status_enum" AS ENUM('pending', 'in_progress', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'approved', 'declined', 'canceled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_method_enum" AS ENUM('credit_card', 'debit_card', 'pix', 'payment_slip')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."provider_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."contract_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payment_method_enum"`);
  }
}
