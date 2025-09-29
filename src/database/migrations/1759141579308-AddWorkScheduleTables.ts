import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkScheduleTables1759141579308 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE "work_schedules" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "day_of_week" integer NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "start_time" TIME WITHOUT TIME ZONE NOT NULL,
                "end_time" TIME WITHOUT TIME ZONE NOT NULL,
                "provider_id" uuid NOT NULL,
                CONSTRAINT "PK_work_schedules_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "schedule_breaks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "start_time" TIME WITHOUT TIME ZONE NOT NULL,
                "end_time" TIME WITHOUT TIME ZONE NOT NULL,
                "work_schedule_id" uuid NOT NULL,
                CONSTRAINT "PK_schedule_breaks_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "schedule_overrides" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "date" DATE NOT NULL,
                "is_active" boolean NOT NULL,
                "start_time" TIME WITHOUT TIME ZONE,
                "end_time" TIME WITHOUT TIME ZONE,
                "description" text,
                "provider_id" uuid NOT NULL,
                CONSTRAINT "PK_schedule_overrides_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "work_schedules" 
            ADD CONSTRAINT "FK_work_schedules_provider" 
            FOREIGN KEY ("provider_id") 
            REFERENCES "provider"("id") 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "schedule_breaks" 
            ADD CONSTRAINT "FK_schedule_breaks_work_schedules" 
            FOREIGN KEY ("work_schedule_id") 	
            REFERENCES "work_schedules"("id") 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "schedule_overrides" 
            ADD CONSTRAINT "FK_schedule_overrides_provider" 
            FOREIGN KEY ("provider_id") 
            REFERENCES "provider"("id") 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_overrides" DROP CONSTRAINT "FK_schedule_overrides_provider"`);
        await queryRunner.query(`ALTER TABLE "schedule_breaks" DROP CONSTRAINT "FK_schedule_breaks_work_schedules"`);
        await queryRunner.query(`ALTER TABLE "work_schedules" DROP CONSTRAINT "FK_work_schedules_provider"`);

        await queryRunner.query(`DROP TABLE "schedule_overrides"`);
        await queryRunner.query(`DROP TABLE "schedule_breaks"`);
        await queryRunner.query(`DROP TABLE "work_schedules"`);
    }
}

