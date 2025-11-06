import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultCreatedAtQuotation1762437829481 implements MigrationInterface {
    name = 'SetDefaultCreatedAtQuotation1762437829481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_request" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotation_request" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

}
