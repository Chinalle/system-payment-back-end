import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAvailabilitySchema1762792608766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "start_time" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "end_time" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "start_time" TYPE time USING start_time::time`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "end_time" TYPE time USING end_time::time`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "start_time" TYPE timestamptz USING start_time::timestamptz`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "end_time" TYPE timestamptz USING end_time::timestamptz`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "start_time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "end_time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "id" DROP DEFAULT`);
    }

}
