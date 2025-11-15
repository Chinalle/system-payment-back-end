import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const useSSL = process.env.USE_SSL === 'true' ? true : false;

const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('POSTGRESQL_HOST'),
  port: configService.get<number>('POSTGRESQL_PORT'),
  username: configService.get<string>('POSTGRESQL_USERNAME'),
  password: configService.get<string>('POSTGRESQL_PASSWORD'),
  database: configService.get<string>('POSTGRESQL_DATABASE'),
  ssl: useSSL ? { rejectUnauthorized: false } : false,
  entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
  migrations: [join(__dirname, '../database/migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
};

export default new DataSource(dataSourceOptions);
