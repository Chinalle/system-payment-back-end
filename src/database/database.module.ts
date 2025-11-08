import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRESQL_HOST'),
        port: configService.get<number>('POSTGRESQL_PORT'),
        username: configService.get<string>('POSTGRESQL_USERNAME'),
        password: configService.get<string>('POSTGRESQL_PASSWORD'),
        database: configService.get<string>('POSTGRESQL_DATABASE'),

        entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
        autoLoadEntities: true,

        migrations: [join(__dirname, '../database/migrations/**/*{.ts,.js}')],
        migrationsTableName: 'migrations',
        synchronize: false,
        logging: true,
        logger: 'file',
      }),
    }),
  ],
})
export class DatabaseModule {}
