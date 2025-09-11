import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAILER_HOST'),
          port: Number(config.get<number>('MAILER_PORT')),
          secure: config.get<boolean>('MAILER_SECURE'),
          auth: {
            user: config.get<string>('MAILER_USER'),
            pass: config.get<string>('MAILER_PASS'),
          },
        },
        defaults: {
          from: config.get<string>('MAILER_FROM'),
        },
      }),
    }),
  ],
  exports: [NestMailerModule],
})
export class MailerModule {}
