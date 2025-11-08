import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

console.log(join(__dirname, '../migrations/**/*{.ts,.js}'));

const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('POSTGRESQL_HOST'),
  port: configService.get<number>('POSTGRESQL_PORT'),
  username: configService.get<string>('POSTGRESQL_USERNAME'),
  password: configService.get<string>('POSTGRESQL_PASSWORD'),
  database: configService.get<string>('POSTGRESQL_DATABASE'),
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  migrationsTableName: 'migrations',
};

export default new DataSource(dataSourceOptions);
