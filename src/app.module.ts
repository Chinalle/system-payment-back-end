import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AvailabilityModule } from './avaiability/availability.module';
import { CompanyModule } from './companies/company.module';
import { DatabaseModule } from './database/database.module';
import { MailerModule } from './mailer/mailer.module';
import { PaymentsModule } from './payments/payments.module';
import { QuotationRequestModule } from './quotation-request/quotation-request.module';
import { QuotationModule } from './quotation/quotation.module';
import { ServiceModule } from './services/service.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MailerModule,
    DatabaseModule,
    UserModule,
    // SeedModule,
    AuthModule,
    // ServiceModule,
    CompanyModule,
    ServiceModule,
    QuotationModule,
    QuotationRequestModule,
    AvailabilityModule,
    PaymentsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
