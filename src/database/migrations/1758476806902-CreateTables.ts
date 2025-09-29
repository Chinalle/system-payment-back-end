import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1758476806902 implements MigrationInterface {
    name = 'CreateTables1758476806902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('client', 'manager', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."provider_roleprovider_enum" AS ENUM('collaborator', 'supervisor', 'coordinator')`);
        await queryRunner.query(`CREATE TYPE "public"."contract_status_enum" AS ENUM('pending', 'in_progress', 'completed', 'canceled')`);
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'approved', 'declined', 'canceled')`);
        await queryRunner.query(`CREATE TYPE "public"."payment_payment_method_enum" AS ENUM('credit_card', 'debit_card', 'pix', 'payment_slip')`);

        await queryRunner.query(`
            CREATE TABLE "address" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "public_place" character varying(255) NOT NULL,
                "district" character varying(255) NOT NULL,
                "house_number" character varying(45) NOT NULL,
                "city" character varying(255) NOT NULL,
                "state" character varying(255) NOT NULL,
                CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "login" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying(100) NOT NULL,
                "password" character varying(255) NOT NULL,
                CONSTRAINT "UQ_a624734967a90fed422db72e5a5" UNIQUE ("email"),
                CONSTRAINT "PK_0e29aa24b035c39a89b889587c6" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name_full" character varying(255) NOT NULL,
                "telephone" character varying(45) NOT NULL,
                "cpf_cnpj" character varying(45) NOT NULL,
                "birth_date" date NOT NULL,
                "role" "public"."user_role_enum" NOT NULL,
                "is_active" boolean NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "login_id" uuid,
                "endereco_id" uuid,
                CONSTRAINT "UQ_b33748246abc6b5d422a5a545e8" UNIQUE ("cpf_cnpj"),
                CONSTRAINT "REL_68d734827d5320d3a7b31e95b0" UNIQUE ("login_id"),
                CONSTRAINT "REL_445f1cf59458231268c81215c3" UNIQUE ("endereco_id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "service_category" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "category" character varying(45) NOT NULL,
                CONSTRAINT "PK_b38032c88ed55c7075d9dd83350" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "company" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "company_name" character varying(45) NOT NULL,
                "user_id" uuid,
                CONSTRAINT "REL_c8c7c94316a3c9e623199857d9" UNIQUE ("user_id"),
                CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "bank_details" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "account" character varying(45) NOT NULL,
                "agency" character varying(45) NOT NULL,
                "bank" character varying(45) NOT NULL,
                "key_pix" character varying(255) NOT NULL,
                "empresa_id" uuid,
                CONSTRAINT "PK_437435f3366c89f5064e624c7f1" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "value" double precision NOT NULL,
                "status" "public"."payment_status_enum" NOT NULL DEFAULT 'pending',
                "payment_method" "public"."payment_payment_method_enum" NOT NULL,
                "installments" integer,
                "processed_in" TIMESTAMP,
                CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "services_products" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "service_name" character varying(45) NOT NULL,
                "description" text,
                "execution_time_minuted" integer,
                "price" double precision NOT NULL,
                "categoria_id" uuid,
                CONSTRAINT "REL_e4ac120c4a45a3d7638d2f2d93" UNIQUE ("categoria_id"),
                CONSTRAINT "PK_9b2d207759882a93108c4a4805e" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "provider" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "provider_name" character varying(255) NOT NULL,
                "roleProvider" "public"."provider_roleprovider_enum" NOT NULL,
                "login_id" uuid,
                "empresa_id" uuid,
                CONSTRAINT "REL_51cbb583d87532ad5193f433aa" UNIQUE ("login_id"),
                CONSTRAINT "PK_a5c4cb4310578411f782348b335" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "contract" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "hiring_date" TIMESTAMP NOT NULL DEFAULT now(),
                "total_value" double precision NOT NULL,
                "status" "public"."contract_status_enum" NOT NULL DEFAULT 'pending',
                "term" date,
                "user_id" uuid,
                "company_id" uuid,
                "payment_id" uuid,
                "servico_id" uuid,
                CONSTRAINT "REL_b6c4b2b2b160b784a0c86851b9" UNIQUE ("payment_id"),
                CONSTRAINT "REL_63f458114f0e5272b227a9ca5d" UNIQUE ("servico_id"),
                CONSTRAINT "PK_17849420b220678d2b7811d7351" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "provider_has_contracts" (
                "contracts_id" uuid NOT NULL,
                "provider_id" uuid NOT NULL,
                CONSTRAINT "PK_e88a38c4c7c8f4d9c7f1a3b5c6d" PRIMARY KEY ("contracts_id", "provider_id")
            )
        `);
        await queryRunner.query(`CREATE INDEX "IDX_5f0c459f0f9f3c0c1b0c8e1e75" ON "provider_has_contracts" ("contracts_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_8a7a5d9f8d9f7e6e5f4c3b2a1a" ON "provider_has_contracts" ("provider_id")`);

        await queryRunner.query(`
            CREATE TABLE "services_products_payment_payment" (
                "servicesProductsId" uuid NOT NULL,
                "paymentId" uuid NOT NULL,
                CONSTRAINT "PK_b9e9b0b1b2b3c4d5e6f7g8h9i0" PRIMARY KEY ("servicesProductsId", "paymentId")
            )
        `);

        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_user_login" FOREIGN KEY ("login_id") REFERENCES "login"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_user_address" FOREIGN KEY ("endereco_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_company_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_details" ADD CONSTRAINT "FK_bank_details_company" FOREIGN KEY ("empresa_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services_products" ADD CONSTRAINT "FK_sp_service_category" FOREIGN KEY ("categoria_id") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_provider_login" FOREIGN KEY ("login_id") REFERENCES "login"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_provider_company" FOREIGN KEY ("empresa_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_contract_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_contract_company" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_contract_payment" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_contract_service_product" FOREIGN KEY ("servico_id") REFERENCES "services_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider_has_contracts" ADD CONSTRAINT "FK_phc_contracts" FOREIGN KEY ("contracts_id") REFERENCES "contract"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "provider_has_contracts" ADD CONSTRAINT "FK_phc_provider" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_has_contracts" DROP CONSTRAINT "FK_phc_provider"`);
        await queryRunner.query(`ALTER TABLE "provider_has_contracts" DROP CONSTRAINT "FK_phc_contracts"`);

        await queryRunner.query(`DROP INDEX "public"."IDX_8a7a5d9f8d9f7e6e5f4c3b2a1a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f0c459f0f9f3c0c1b0c8e1e75"`);
        await queryRunner.query(`DROP TABLE "services_products_payment_payment"`);
        await queryRunner.query(`DROP TABLE "provider_has_contracts"`);

        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "services_products"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "bank_details"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "service_category"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "login"`);
        await queryRunner.query(`DROP TABLE "address"`);

        await queryRunner.query(`DROP TYPE "public"."payment_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."contract_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."provider_roleprovider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }
}